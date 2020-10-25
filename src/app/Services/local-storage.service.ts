import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public getAll<T extends Identity>(source: string): Observable<T[]> {
        return this.loadLocalStorageSource(source);
    }

    public get<T extends Identity>(source: string, id: number): Observable<T> {
        return this.loadLocalStorageSource(source).pipe(map(items => {
            return items.find(item => item.id === id) as T;
        }));
    }

    public create<T extends Identity>(source: string, item: T): Observable<T> {
        return this.loadLocalStorageSource(source).pipe(map(items => {
            item.id = items.length + 1;

            items.push(item);

            this.reLoadLocalStorageSource(source, items);

            return item;
        }));
    }

    private loadLocalStorageSource<T extends Identity>(source: string): Observable<T[]> {
        return new Observable(observable$ => {
            const itemsAsJSON = localStorage.getItem(source);

            let items: T[] = JSON.parse(itemsAsJSON) as T[];

            if (items == null) {
                items = new Array<T>();
            }

            observable$.next(items);
        });
    }

    private reLoadLocalStorageSource<T extends Identity>(source: string, items: T[]): T[] {
        localStorage.removeItem(source);

        const itemsAsJSON = JSON.stringify(items);

        localStorage.setItem(source, itemsAsJSON);

        return items;
    }

    public update<T extends Identity>(source: string, id: number, item: T): Observable<T> {
        return this.loadLocalStorageSource(source).pipe(map(items => {
            let itemToBeUpdated = items.find(itemToFind => itemToFind.id === id) as T;

            const index = items.indexOf(itemToBeUpdated);

            const updatedItems = items.splice(index, 1);

            itemToBeUpdated = item;

            itemToBeUpdated.id = id;

            updatedItems.push(itemToBeUpdated);

            this.reLoadLocalStorageSource(source, updatedItems);

            return itemToBeUpdated;
        }));
    }

    public delete<T extends Identity>(source: string, id: number): Observable<T> {
        return this.loadLocalStorageSource(source).pipe(map(items => {
            const index = items.findIndex(itemToFind => itemToFind.id === id);

            const item = items[index] as T;

            const updatedItems = items.splice(index, 1);

            this.reLoadLocalStorageSource(source, updatedItems);

            return item;
        }));
    }

    deleteAll(source: string): void {
        localStorage.removeItem(source);
    }
}

export interface Identity {
    id: number;
}
