import {Component, OnInit} from '@angular/core';
import {Book} from "../models/book";
import {BooksService} from "../books.service";

@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  public book: Book = <Book>{};
  public isEditMode = false;

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.bookService.EditId.subscribe(val => {
      this.book = val;
      this.isEditMode = true;
    });
  }

  public addBook(): void {
    this.bookService.addBook(this.book).subscribe();
    this.clear();
    this.isEditMode = false;
  }

  public clear(): void {
    this.book = <Book>{};
    this.isEditMode = false;
  }
}
