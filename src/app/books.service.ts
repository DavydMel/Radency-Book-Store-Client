import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, retry, Subject, tap, throwError} from "rxjs";
import {Book} from "./models/book";
import {BookShort} from "./models/bookShort";
import {BookDetail} from "./models/bookDetail";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private url = 'https://localhost:5000/api';
  private refreshRequired = new Subject<void>();
  get RefreshRequired() {
    return this.refreshRequired;
  }
  private editId =  new Subject<Book>();
  get EditId() {
    return this.editId;
  }

  constructor(
    private http: HttpClient,
  ) { }

  getBooks(): Observable<BookShort[]> {
    return this.http.get<BookShort[]>(this.url + "/books")
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getBook(id: number): Observable<BookDetail> {
    return this.http.get<BookDetail>(this.url + `/books/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getRecommendedBooks(): Observable<BookShort[]> {
    return this.http.get<BookShort[]>(this.url + "/recommended")
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.url + "/books/save", book)
      .pipe(
        tap(() => {
          this.refreshRequired.next();
        }),
        catchError(this.handleError)
      );
  }

  editBook(id: number): void {
    this.getBook(id).subscribe(bookDetail => {
      this.editId.next(bookDetail as Book);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
