import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  users: User[] = [];
  isDeleteInPogress: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.isDeleteInPogress = true;
    this.userService.deleteUser(id).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Correct',
          detail: 'User deleted successfully'
        });
        this.isDeleteInPogress = false;
        this.getAllUsers();
      },
      error:() => {
        this.isDeleteInPogress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete user'
        });
        this.getAllUsers();
      }
    })
  }
}
