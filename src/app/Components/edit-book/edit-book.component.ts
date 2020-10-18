import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/Book';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book;

  submitted = false;

  constructor(private bookService: BookService) { this.book = new Book(); }

  ngOnInit(): void {
  }

  saveBook(): void {
    const data: Book = {
      id: this.book.id,
      title: this.book.title,
      category: this.book.category,
      published: this.book.published
    };

    this.bookService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newBook(): void {
    this.submitted = false;
    this.book = new Book();
  }
}
