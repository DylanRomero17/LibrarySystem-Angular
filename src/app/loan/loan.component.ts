import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Loan } from '../models/loan';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss'
})
export class LoanComponent {
  loans: Loan[] = [];
  isDeleteInPogress: boolean = false;

  constructor(private loanService: LoanService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllLoans();
  }

  getAllLoans() {
    this.loanService.getLoans().subscribe((data) => {
      this.loans = data;
    });
  }

  deleteLoan(id: number) {
    this.isDeleteInPogress = true;
    this.loanService.deleteLoan(id).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Correct',
          detail: 'Loan deleted successfully'
        });
        this.isDeleteInPogress = false;
        this.getAllLoans();
      },
      error:() => {
        this.isDeleteInPogress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete loan'
        });
        this.getAllLoans();
      }
    })
  }
}
