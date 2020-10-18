import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditBookComponent } from './Components/edit-book/edit-book.component';
import { ListBookComponent } from './Components/list-book/list-book.component';

@NgModule({
  declarations: [
    AppComponent,
    EditBookComponent,
    ListBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
