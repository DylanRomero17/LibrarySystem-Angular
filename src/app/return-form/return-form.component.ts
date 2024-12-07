import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Loan } from '../models/loan';
import { ReturnService } from '../services/return.service';
import { LoanService } from '../services/loan.service';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-return-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule, CalendarModule, DropdownModule],
  templateUrl: './return-form.component.html',
  styleUrl: './return-form.component.scss'
})
export class ReturnFormComponent {
  formReturn!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  loans: Loan[] = [];
  employee: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private returnService: ReturnService,
    private loanService: LoanService,
    private employeeService: EmployeeService
  ) {
    this.formReturn = this.fb.group({
      id: [null],
      returnDate: ['', Validators.required],
      status: ['', Validators.required],
      observation: [''],
      loan: ['', Validators.required],
      employee: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
    this.loadEmployee();

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getReturnById(+id!);
    }
  }

  loadLoans() {
    this.loanService.getLoans().subscribe((data) => {
      this.loans = data;
    });
  }

  loadEmployee() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employee = data;
    });
  }

  getReturnById(id: number) {
    this.returnService.getReturnById(id).subscribe((data) => {
      this.formReturn.patchValue(data);
    });
  }

  createReturn() {
    if(this.formReturn.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all the fields'
      });
      return;
    }
    const returnObj = {
      ...this.formReturn.value,
      returnDate: this.formatDate(this.formReturn.value.returnDate),
      loan: { id: this.formReturn.value.loan },
      employee: { id: this.formReturn.value.employee }
    };
    this.isSaveInProgress = true;
    this.returnService.createReturn(returnObj).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correct',
          detail: 'Return created successfully'
        });
        this.isSaveInProgress = false;
        this.router.navigate(['/return']);
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not create return'
        });
      }
    });
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mes empieza desde 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateReturn() {
    if(this.formReturn.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all the fields'
      });
      return;
    }
    const returnObj = {
      ...this.formReturn.value,
      returnDate: this.formatDate(this.formReturn.value.returnDate),
      loan: { id: this.formReturn.value.loan },
      employee: { id: this.formReturn.value.employee }
    };
    this.isSaveInProgress = true;
    this.returnService.updateReturn(returnObj).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correct',
          detail: 'Return updated successfully'
        });
        this.isSaveInProgress = false;
        this.router.navigate(['/return']);
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not update return'
        });
      }
    });
  }

}
