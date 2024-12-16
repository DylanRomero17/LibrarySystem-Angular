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
import { Book } from '../models/book';
import { Loan } from '../models/loan';
import { BookLoanService } from '../services/book-loan.service';
import { BookService } from '../services/book.service';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-book-loan-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule, CalendarModule, DropdownModule],
  templateUrl: './book-loan-form.component.html',
  styleUrl: './book-loan-form.component.scss'
})
export class BookLoanFormComponent {
  formBookLoan!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  books: Book[] = [];
  loans: Loan[] = [];

  constructor(
    private fb: FormBuilder,
    private bookLoanService: BookLoanService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private loanService: LoanService,
    private route: ActivatedRoute
  ) {
    this.formBookLoan = this.fb.group({
      id: [null],
      status: ['', Validators.required],
      returnDate: ['', Validators.required],
      book: ['', Validators.required],
      loan: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBooks();
    // this.loadLoans();
    this.loadLoansWithLoanId();

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getBookLoanById(+id!);
    }
  }

  loadLoansWithLoanId() {
    this.route.params.subscribe((params) => {
      const loanId = params['loanId']; // Capturamos el ID del préstamo desde la URL

      this.loanService.getLoans().subscribe((data) => {
        this.loans = data; // Cargamos los préstamos en el combo
        // Si existe un loanId válido, configuramos el valor inicial del formulario
        if (loanId) {
          this.formBookLoan.patchValue({ loan: +loanId }); // Convertimos a número por seguridad
        }
      });
    });
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  // loadLoans() {
  //   this.loanService.getLoans().subscribe((data) => {
  //     this.loans = data;
  //   });
  // }

  getBookLoanById(id: number) {
    this.bookLoanService.getBookLoanById(id).subscribe({
      next: (foundBookLoan) => {
        this.formBookLoan.patchValue(foundBookLoan);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not get book loan'
        });
        this.router.navigate(['/bookLoan']);
      },
    });
  }

  createBookLoan() {
    if (this.formBookLoan.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form invalid'
      });
      return;
    }
    const bookLoan = {
      ...this.formBookLoan.value,
      returnDate: this.formatDate(this.formBookLoan.value.returnDate),
      book: { id: this.formBookLoan.value.book },
      loan: { id: this.formBookLoan.value.loan }
    };
    this.isSaveInProgress = true;
    this.bookLoanService.createBookLoan(bookLoan).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book loan created'
        });
        this.isSaveInProgress = false;
        this.router.navigate(['/bookLoan']);
      },
      error: (err) => {
        console.error(err);
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not create book loan'
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

  updateBookLoan() {
    if (this.formBookLoan.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form invalid'
      });
      return;
    }
    this.isSaveInProgress = true;
    this.bookLoanService.updateBookLoan(this.formBookLoan.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book loan updated'
        });
        this.isSaveInProgress = false;
        this.router.navigate(['/bookLoan']);
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not update book loan'
        });
      }
    });
  }

}
