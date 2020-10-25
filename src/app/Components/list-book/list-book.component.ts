import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  books: Book[];

  currentBook: Book;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(booksList => {
      this.books = booksList;
    });
  }

  setCurrentBook(book: Book): void {
    this.currentBook = book;
  }

  removeAllBooks(): void {
    this.bookService.deleteAll();
    location.reload();
  }

  addNewBook(): void {

  }

}
