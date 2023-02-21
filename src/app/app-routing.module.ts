import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksPageComponent} from "./books-page/books-page.component";
import {ViewBookComponent} from "./view-book/view-book.component";

const routes: Routes = [
  {
    path: 'books',
    component: BooksPageComponent,
    children: [
      {
        path: ":id",
        component: ViewBookComponent
      },
    ]
  },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
