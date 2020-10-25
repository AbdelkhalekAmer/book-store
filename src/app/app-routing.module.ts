import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBookComponent } from './Components/edit-book/edit-book.component';
import { ListBookComponent } from './Components/list-book/list-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: ListBookComponent },
  { path: 'add', component: EditBookComponent },
  { path: 'edit/:id', component: EditBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
