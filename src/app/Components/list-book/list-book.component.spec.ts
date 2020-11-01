import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from 'src/app/Services/book.service';

import { ListBookComponent } from './list-book.component';

describe('ListBookComponent', () => {
  let component: ListBookComponent;
  let fixture: ComponentFixture<ListBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListBookComponent],
      providers: [BookService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
