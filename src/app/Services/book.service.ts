import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Models/Book';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private localStorageService: LocalStorageService) { }

    getAll(): Observable<Book[]> {
        return this.localStorageService.getAll('bookStoreSource');
    }

    get(id: number): Observable<Book> {
        return this.localStorageService.get('bookStoreSource', id);
    }

    create(book: Book): Observable<Book> {
        return this.localStorageService.create('bookStoreSource', book);
    }

    update(id: number, book: Book): Observable<Book> {
        return this.localStorageService.update('bookStoreSource', id, book);
    }

    delete(id: number): Observable<Book> {
        return this.localStorageService.delete('bookStoreSource', id);
    }

    deleteAll(): void {
        return this.localStorageService.deleteAll('bookStoreSource');
    }
}
