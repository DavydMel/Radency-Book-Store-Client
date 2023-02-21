import {Component, Input, OnInit} from '@angular/core';
import {BookShort} from "../models/bookShort";
import {BooksService} from "../books.service";

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books: BookShort[] = [];
  @Input() recommended: boolean = false;

  constructor(private booksPageService: BooksService) { }

  getBooks(): void {
    if (this.recommended) {
      this.booksPageService.getRecommendedBooks()
        .subscribe(books => this.books = books);
    }
    else  {
      this.booksPageService.getBooks()
        .subscribe(books => this.books = books);
    }
  }

  ngOnInit(): void {
    this.getBooks();
  }
}
