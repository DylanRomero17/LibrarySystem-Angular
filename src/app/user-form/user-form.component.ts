import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formUser!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formUser = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      paternalSurname: ['', Validators.required],
      maternalSurname: ['']
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getUserById(+id!);
    }
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (foundUser) => {
        this.formUser.patchValue(foundUser);
      },
      error: () => {
        this.messageService.add({severity:'error', summary:'Error', detail: 'User not found'});
        this.router.navigate(['/']);
      },
    });
  }

  createUser() {
    if (this.formUser.invalid) {
      this.messageService.add({severity:'error', summary:'Error', detail: 'Form invalid'});
      return;
    }
    this.isSaveInProgress = true;
    this.userService.createUser(this.formUser.value).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Correct', detail: 'User created successfully'});
        this.isSaveInProgress = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({severity:'error', summary:'Error', detail: 'Could not create user'});
      },
    });
  }

  updateUser() {
    if (this.formUser.invalid) {
      this.messageService.add({severity:'error', summary:'Error', detail: 'Form invalid'});
      return;
    }
    this.isSaveInProgress = true;
    this.userService.updateUser(this.formUser.value).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Correct', detail: 'User updated successfully'});
        this.isSaveInProgress = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({severity:'error', summary:'Error', detail: 'Could not update user'});
      },
    });
  }

}
