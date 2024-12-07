import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookLoan } from '../models/bookLoan';

@Injectable({
  providedIn: 'root'
})
export class BookLoanService {
  private apiUrl = 'http://localhost:8080/bookLoan';

  constructor(private http: HttpClient) { }

  getBookLoans(): Observable<BookLoan[]> {
    return this.http.get<BookLoan[]>(this.apiUrl);
  }

  getBookLoanById(id: number): Observable<BookLoan> {
    return this.http.get<BookLoan>(`${this.apiUrl}/${id}`);
  }

  createBookLoan(bookLoan: BookLoan): Observable<BookLoan> {
    return this.http.post<BookLoan>(this.apiUrl, bookLoan, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateBookLoan(bookLoan: BookLoan) {
    return this.http.put(this.apiUrl, bookLoan);
  }

  deleteBookLoan(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
