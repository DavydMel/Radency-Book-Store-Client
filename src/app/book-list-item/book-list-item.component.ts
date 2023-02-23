import {Component, Input} from '@angular/core';
import {BookShort} from "../../models/bookShort";
import {BooksService} from "../books.service";
import {isEmpty} from "rxjs";

@Component({
  selector: 'book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {
  @Input() book?: BookShort;

  constructor(private bookService: BooksService) { }

  editBook(): void {
    if (this.book) {
      this.bookService.editBook(this.book.id);
    }
  }
}
