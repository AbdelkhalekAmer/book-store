
import { BookCategory } from './book-category.model';

export class Book {

    constructor(public id: number = 0,
                public title: string = '',
                public category: BookCategory = BookCategory.None,
                public published: boolean = false) {}
}