import {Component, ElementRef, OnInit} from '@angular/core';
import {Book} from "../models/book";
import {BooksService} from "../books.service";
import { ViewChild } from '@angular/core';

@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  public book: Book = <Book>{};
  public isEditMode = false;
  public errors: string = "";

  @ViewChild('imgInput')
  public imgInput: ElementRef | undefined;

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
    if (this.imgInput) {
      this.imgInput.nativeElement.value = null;
    }
  }

  imgChange(e: any) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.book.cover = reader.result;
  }
}
