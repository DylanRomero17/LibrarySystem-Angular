import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { LoanComponent } from './loan/loan.component';
import { LoanFormComponent } from './loan-form/loan-form.component';

export const routes: Routes = [
    {
        path:'',
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
        path:'**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
