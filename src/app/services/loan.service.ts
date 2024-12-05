import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8080/loan';

  constructor(private http: HttpClient) { }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateLoan(loan: Loan) {
    return this.http.put(this.apiUrl, loan);
  }

  deleteLoan(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
