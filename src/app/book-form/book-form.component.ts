import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FileSelectEvent } from 'primeng/fileupload';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, RouterModule, InputTextModule, InputNumberModule, CardModule, FileUploadModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  formBook!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formBook = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      author: ['', Validators.required],
      pages: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getBookById(+id!);
    }
  }

  onFileSelected(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
  }

  getBookById(id: number) {
    this.bookService.getBookById(id).subscribe({
      next: (foundBook) => {
        this.formBook.patchValue(foundBook);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Book not found'
        });
        this.router.navigateByUrl('/')
      },
    });
  }

  createBook() {
    if (this.formBook.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Fill in all fields'
      });
      return;
    }
    if (!this.selectedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Select an image and try again'
      });
      return;
    }
    this.isSaveInProgress = true;
    this.bookService.createBook(this.formBook.value, this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Saved',
          detail: 'Book saved successfully'
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please, check the fields and try again'
        });
      }
    })
  }

  changeImage(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
    if (!this.selectedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Select an image and try again',
      });
      return;
    }
    this.bookService.updateBookImage(this.formBook.value.id, this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Book updated successfully',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Review the selected file',
        });
      },
    });
  }

  updateBook() {
    if (this.formBook.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Fill in all fields'
      });
      return;
    }
    this.isSaveInProgress = true;
    this.bookService.updateBook(this.formBook.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Book updated successfully'
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please, cheack the fields and try again'
        });
      }
    })
  }
}
