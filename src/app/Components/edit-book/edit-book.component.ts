import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/Book';
import { BookCategory } from 'src/app/Models/BookCategory';
import { Submit } from 'src/app/Models/submit.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookCategories: string[];

  bookForm: FormGroup = this.newBookForm();

  submit: Submit = new Submit();

  constructor(private bookService: BookService) {
    this.initializeBookCategories();
  }

  ngOnInit(): void {
  }

  onSubmit(book: Book): void {
    this.bookService.create(book)
      .subscribe(
        response => {
          this.submit = new Submit(true, true, `Book ${response.title} is added successfully to our library.`);
        },
        error => {
          this.submit = new Submit(true, false, `Error in adding book to our library.`, [error]);
        });
  }

  newBook(): void {
    this.submit = new Submit();
    this.bookForm = this.newBookForm();
  }

  newBookForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(''),
      category: new FormControl(BookCategory.None),
      published: new FormControl(false)
    });
  }

  initializeBookCategories(): void {
    this.bookCategories = [];
    this.bookCategories.push(BookCategory.None);
    this.bookCategories.push(BookCategory.Biology);
    this.bookCategories.push(BookCategory.History);
    this.bookCategories.push(BookCategory.Physics);
    this.bookCategories.push(BookCategory.Programming);
  }
}
