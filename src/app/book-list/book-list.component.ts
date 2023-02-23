import {Component, Input, OnInit} from '@angular/core';
import {BookShort} from "../../models/bookShort";
import {BooksService} from "../books.service";
import {Observable} from "rxjs";

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books: Observable<BookShort[]> = new Observable<BookShort[]>();
  @Input() recommended: boolean = false;

  constructor(private booksService: BooksService) { }

  getBooks(): void {
    if (this.recommended) {
      this.books = this.booksService.getRecommendedBooks();
    }
    else  {
      this.books = this.booksService.getBooks();
    }
  }

  ngOnInit(): void {
    this.getBooks();
    this.booksService.RefreshRequired.subscribe(() => {
      this.getBooks();
    });
  }
}
