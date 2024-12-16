import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Return } from '../models/return';
import { ReturnService } from '../services/return.service';

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule, OrderListModule , DragDropModule],
  templateUrl: './return.component.html',
  styleUrl: './return.component.scss'
})
export class ReturnComponent {
  returns: Return[] = [];
  isDeleteInPogress: boolean = false;

  constructor(private returnService: ReturnService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllReturns();
  }

  getAllReturns() {
    this.returnService.getReturns().subscribe((data) => {
      this.returns = data;
    });
  }

  deleteReturn(id: number) {
    this.isDeleteInPogress = true;
    this.returnService.deleteReturn(id).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Correct',
          detail: 'Return deleted successfully'
        });
        this.isDeleteInPogress = false;
        this.getAllReturns();
      },
      error:() => {
        this.isDeleteInPogress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete return'
        });
        this.getAllReturns();
      }
    })
  }

}
