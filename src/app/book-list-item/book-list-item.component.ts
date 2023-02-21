import {Component, Input} from '@angular/core';
import {BookShort} from "../models/bookShort";

@Component({
  selector: 'book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {
  @Input() book?: BookShort;
}
