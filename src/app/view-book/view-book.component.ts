import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import {BookDetail} from "../models/bookDetail";
import {BooksService} from "../books.service";

@Component({
  selector: 'view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  public book: BookDetail = <BookDetail>{};

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private bookService: BooksService
  ) { }

  back(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getBook(Number(this.route.snapshot.params["id"]));
  }

  getBook(id: number) {
    this.bookService.getBook(id)
      .subscribe(book => {
        this.book = book;
      });
  }
}
