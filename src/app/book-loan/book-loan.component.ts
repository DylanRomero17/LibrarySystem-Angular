import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { BookLoan } from '../models/bookLoan';
import { BookLoanService } from '../services/book-loan.service';

@Component({
  selector: 'app-book-loan',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule],
  templateUrl: './book-loan.component.html',
  styleUrl: './book-loan.component.scss'
})
export class BookLoanComponent {
  bookLoans: BookLoan[] = [];
  isDeleteInPogress: boolean = false;

  constructor(private bookLoanService: BookLoanService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllBookLoans();
  }

  getAllBookLoans() {
    this.bookLoanService.getBookLoans().subscribe((data) => {
      this.bookLoans = data;
    });
  }

  deleteBookLoan(id: number) {
    this.isDeleteInPogress = true;
    this.bookLoanService.deleteBookLoan(id).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Correct',
          detail: 'Book loan deleted successfully'
        });
        this.isDeleteInPogress = false;
        this.getAllBookLoans();
      },
      error:() => {
        this.isDeleteInPogress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete book loan'
        });
        this.getAllBookLoans();
      }
    })
  }

  
}
