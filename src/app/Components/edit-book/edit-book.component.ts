import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/book.model';
import { BookCategory } from 'src/app/Models/book-category.model';
import { Submit } from 'src/app/Models/submit.model';
import { BookService } from 'src/app/Services/book.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookCategories: string[];

  bookForm: FormGroup = this.newBookForm();

  submit: Submit = new Submit();

  bookIdToBeEdited: number;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  // tslint:disable-next-line: typedef
  get bookFormControls() {
    return this.bookForm.controls;
  }

  ngOnInit(): void {
    this.initializeBookCategories();

    this.activatedRoute.paramMap.subscribe(params => {
      this.bookIdToBeEdited = +params.get('id');

      if (this.bookIdToBeEdited > 0) {
        this.bookService.get(this.bookIdToBeEdited).subscribe(book => {
          this.bookForm = this.newBookForm(book);
        });
      }
    });
  }

  onSubmit(book: Book): void {
    this.submit.submitted = true;

    if (this.bookForm.valid) {
      if (this.bookIdToBeEdited > 0) {
        this.bookService.update(this.bookIdToBeEdited, book)
          .subscribe(
            response => {
              this.submit = new Submit(true, true, `Book ${response.title} is updated successfully in our library.`);
            },
            error => {
              this.submit = new Submit(true, false, `Error in updating book to our library.`, [error]);
            });
      }
      else {
        this.bookService.create(book)
          .subscribe(
            response => {
              this.submit = new Submit(true, true, `Book ${response.title} is added successfully to our library.`);
            },
            error => {
              this.submit = new Submit(true, false, `Error in adding book to our library.`, [error]);
            });
      }
    }
  }

  newBook(): void {
    this.submit = new Submit();
    this.bookForm = this.newBookForm();
  }

  newBookForm(book: Book = new Book()): FormGroup {
    return new FormGroup({
      title: new FormControl(book.title, [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(3)
      ]),
      category: new FormControl(book.category),
      published: new FormControl(book.published)
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
