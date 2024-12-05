import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);    
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.apiUrl, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
