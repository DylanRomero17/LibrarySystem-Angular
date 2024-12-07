import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLoanFormComponent } from './book-loan-form.component';

describe('BookLoanFormComponent', () => {
  let component: BookLoanFormComponent;
  let fixture: ComponentFixture<BookLoanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLoanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookLoanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
