import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Models/Book';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor() { }

    // getAll(): Observable<any> {
    //     return this.http.get(baseUrl);
    // }

    // get(id): Observable<any> {
    //     return this.http.get(`${baseUrl}/${id}`);
    // }

    create(book: Book): Observable<Book> {
        return new Observable<Book>(data => {
            let booksAsJSON = localStorage.getItem('bookStoreSource');
            let books: Book[] = JSON.parse(booksAsJSON) as Book[];

            if (books == null) {
                books = new Array<Book>();
            }

            books.push(book);
            localStorage.removeItem('bookStoreSource');
            booksAsJSON = JSON.stringify(books);
            localStorage.setItem('bookStoreSource', booksAsJSON);
        });
    }

    // update(id, data): Observable<any> {
    //     return this.http.put(`${baseUrl}/${id}`, data);
    // }

    // delete(id): Observable<any> {
    //     return this.http.delete(`${baseUrl}/${id}`);
    // }

    // deleteAll(): Observable<any> {
    //     return this.http.delete(baseUrl);
    // }

    // findByTitle(title): Observable<any> {
    //     return this.http.get(`${baseUrl}?title=${title}`);
    // }
}
