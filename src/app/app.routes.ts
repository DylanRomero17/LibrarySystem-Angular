import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title: 'Página de inicio'
    },
    {
        path:'book-form/:id',
        component: BookFormComponent,
        title: 'Página de inicio'
    },
    {
        path:'**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
