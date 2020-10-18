import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBookComponent } from './Components/edit-book/edit-book.component';

const routes: Routes = [
  { path: 'add', component: EditBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
