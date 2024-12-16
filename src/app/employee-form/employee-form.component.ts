import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { EmployeeService } from '../services/employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {

  formEmployee!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formEmployee = this.fb.group({
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
      this.getEmployeeById(+id!);
    }
  }

  getEmployeeById(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (foundEmployee) => {
        this.formEmployee.patchValue(foundEmployee);
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail: 'Employee not found'});
        this.router.navigate(['/']);
      },
    });
  }

  createEmployee() {
    if (this.formEmployee.invalid) {
      this.messageService.add({severity:'error', summary:'Error', detail: 'Fill in all fields'});
      return;
    }
    this.isSaveInProgress = true;
    this.employeeService.createEmployee(this.formEmployee.value).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Success', detail: 'Employee created successfully'});
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/employee');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({severity:'error', summary:'Error', detail: 'Please, check the fields and try again later'});
      },
    });
  }

  updateEmployee() {
    if (this.formEmployee.invalid) {
      this.messageService.add({severity:'error', summary:'Error', detail: 'Fill in all fields'});
      return;
    }
    this.isSaveInProgress = true;
    this.employeeService.updateEmployee(this.formEmployee.value).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Updated', detail: 'Employee updated successfully'});
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/employee');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({severity:'error', summary:'Error', detail: 'Please, check the fields and try again later'});
      },
    });
  }

}
