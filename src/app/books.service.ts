import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {BookShort} from "./models/bookShort";
import {BookDetail} from "./models/bookDetail";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private url = 'https://localhost:5000/api';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<BookShort[]> {
    return this.http.get<BookShort[]>(this.url + "/books");
  }

  getBook(id: number): Observable<BookDetail> {
    return this.http.get<BookDetail>(this.url + `/books/${id}`);
  }

  getRecommendedBooks(): Observable<BookShort[]> {
    return this.http.get<BookShort[]>(this.url + "/recommended");
  }
}
