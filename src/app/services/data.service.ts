import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { PaginatedResponse } from '../models/paginated-response.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private base = 'http://localhost:8080/api/data';

  constructor(private http: HttpClient) { }

  getPaginated(page: number, size: number): Observable<PaginatedResponse<Student>> {
    return this.http.get<PaginatedResponse<Student>>(`${this.base}/all?page=${page}&size=${size}`);
  }

  getByClass(className: string, page: number, size: number): Observable<PaginatedResponse<Student>> {
    return this.http.get<PaginatedResponse<Student>>(
      `${this.base}/class/${className}?page=${page}&size=${size}`
    );
  }

  getById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.base}/${studentId}`);
  }

}
