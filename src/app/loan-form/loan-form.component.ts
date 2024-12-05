import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { LoanService } from '../services/loan.service';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../services/user.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { User } from '../models/user';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule, CalendarModule, DropdownModule],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss'
})
export class LoanFormComponent implements OnInit {
  formLoan!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  users: User[] = [];
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formLoan = this.fb.group({
      id: [null],
      loanDate: ['', Validators.required],
      loanStatus: ['', Validators.required],
      user: ['', Validators.required],
      employee: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadEmployees();
    // let id = this.activatedRoute.snapshot.paramMap.get('id');
    // if (id !== 'new') {
    //   this.edit = true;
    //   this.getLoanById(+id!);
    // }
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  getLoanById(id: number) {
    this.loanService.getLoanById(id).subscribe({
      next: (foundLoan) => {
        this.formLoan.patchValue(foundLoan);
      },
      error: () => {
        this.messageService.add({severity:'error', summary:'Error', detail: 'Loan not found'});
        this.router.navigate(['/']);
      },
    });
  }

  createLoan() {
    if (this.formLoan.invalid) {
      this.messageService.add({severity:'error', summary:'Error', detail: 'Form invalid'});
      return;
    }
    const loan = {
      ...this.formLoan.value,
      loanDate: this.formatDate(this.formLoan.value.loanDate),
      user: { id: this.formLoan.value.user },
      employee: { id: this.formLoan.value.employee },
    };
    console.log(loan);
    this.isSaveInProgress = true;
    this.loanService.createLoan(loan).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Success', detail: 'Loan created'});
        this.isSaveInProgress = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.isSaveInProgress = false;
        const errorMessage = err.error?.message || 'Error creating loan';
        this.messageService.add({severity:'error', summary:'Error', detail: 'Error creating loan'});
      },
    });
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mes empieza desde 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  updateLoan() {
    if (this.formLoan.invalid) {
      this.messageService.add({severity:'error', summary:'Error', detail: 'Form invalid'});
      return;
    }
    this.isSaveInProgress = true;
    this.loanService.updateLoan(this.formLoan.value).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Success', detail: 'Loan updated'});
        this.isSaveInProgress = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({severity:'error', summary:'Error', detail: 'Error updating loan'});
      },
    });
  }
}
