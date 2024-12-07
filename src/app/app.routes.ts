import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { LoanComponent } from './loan/loan.component';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { BookLoanComponent } from './book-loan/book-loan.component';
import { BookLoanFormComponent } from './book-loan-form/book-loan-form.component';
import { ReturnComponent } from './return/return.component';
import { ReturnFormComponent } from './return-form/return-form.component';

export const routes: Routes = [
    {
        path:'home',
        component: HomeComponent,
        title: 'Página de inicio'
    },
    {
        path:'book-form/:id',
        component: BookFormComponent,
        title: 'Book Form'
    },
    {
        path:'employee',
        component: EmployeeComponent,
        title: 'Employee'
    },
    {
        path:'employee-form/:id',
        component: EmployeeFormComponent,
        title: 'Employee Form'
    },
    {
        path:'user',
        component: UserComponent,
        title: 'User'
    },
    {
        path:'user-form/:id',
        component: UserFormComponent,
        title: 'User Form'
    },
    {
        path:'loan',
        component: LoanComponent,
        title: 'Loan'
    },
    {
        path:'loan-form/:id',
        component: LoanFormComponent,
        title: 'Loan Form'
    },
    {
        path:'bookLoan',
        component: BookLoanComponent,
        title: 'bookLoan'
    },
    {
        path:'book-loan-form/:id',
        component: BookLoanFormComponent,
        title: 'Book-Loan Form'
    },
    {
        path:'return',
        component: ReturnComponent,
        title: 'Return'
    },
    {
        path:'return-form/:id',
        component: ReturnFormComponent,
        title: 'Return Form'
    },
    {
        path:'**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
