import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabMenuModule, ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems: any[] = [];

  ngOnInit() {
    this.menuItems = [
      { label: 'Books', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'New Book', icon: 'pi pi-fw pi-book', routerLink: '/book-form/new' },
      { label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: '/employee' },
      { label: 'Users', icon: 'pi pi-fw pi-user', routerLink: '/user' },
      { label: 'Loans', icon: 'pi pi-fw pi-money-bill', routerLink: '/loan' },
      { label: 'Book - Loans', icon: 'pi pi-fw pi-bookmark', routerLink: '/bookLoan' },
      { label: 'Returns', icon: 'pi pi-fw pi-undo', routerLink: '/return' }
    ];
  }
}