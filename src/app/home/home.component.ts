import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule, TabMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  books: Book[] = [];
  isDeleteInPogress: boolean = false;

  constructor(private bookService: BookService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  deleteBook(id: number) {
    this.isDeleteInPogress = true;
    this.bookService.deleteBook(id).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Correct',
          detail: 'Book deleted successfully'
        });
        this.isDeleteInPogress = false;
        this.getAllBooks();
      },
      error:() => {
        this.isDeleteInPogress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete book'
        });
        this.getAllBooks();
      }
    })
  }
}
