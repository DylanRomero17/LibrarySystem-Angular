import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Return } from '../models/return';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {
  private apiUrl = 'http://localhost:8080/return';

  constructor(private http: HttpClient) { }

  getReturns(): Observable<Return[]> {
    return this.http.get<Return[]>(this.apiUrl);
  }

  getReturnById(id: number): Observable<Return> {
    return this.http.get<Return>(`${this.apiUrl}/${id}`);
  }

  createReturn(returnObj: Return): Observable<Return> {
    return this.http.post<Return>(this.apiUrl, returnObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateReturn(returnObj: Return) {
    return this.http.put(this.apiUrl, returnObj);
  }

  deleteReturn(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
