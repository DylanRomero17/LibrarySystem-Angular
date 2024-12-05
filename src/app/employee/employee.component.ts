import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  employees: Employee[] = [];
  isDeleteInPogress: boolean = false;

  constructor(private employeeService: EmployeeService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  deleteEmployee(id: number) {
    this.isDeleteInPogress = true;
    this.employeeService.deleteEmployee(id).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Correct',
          detail: 'Employee deleted successfully'
        });
        this.isDeleteInPogress = false;
        this.getAllEmployees();
      },
      error:() => {
        this.isDeleteInPogress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete employee'
        });
        this.getAllEmployees();
      }
    })
  }

}
