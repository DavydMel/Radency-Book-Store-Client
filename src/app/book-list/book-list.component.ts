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

  constructor(private booksService: BooksService) { }

  getBooks(): void {
    if (this.recommended) {
      this.booksService.getRecommendedBooks()
        .subscribe(books => this.books = books);
    }
    else  {
      this.booksService.getBooks()
        .subscribe(books => this.books = books);
    }
  }

  ngOnInit(): void {
    this.getBooks();
    this.booksService.RefreshRequired.subscribe(response => {
      this.getBooks();
    });
  }
}
