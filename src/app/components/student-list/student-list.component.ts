import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DataService } from '../../services/data.service';
import { Student } from '../../models/student.model';
import { PaginatedResponse } from '../../models/paginated-response.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['studentId', 'firstName', 'lastName', 'dob', 'className', 'score', 'actions'];

  pageNumber = 0;
  pageSize = 20;
  totalElements = 0;

  isLoading = false;
  selectedClass = '';
  classOptions = ['Class1', 'Class2', 'Class3', 'Class4', 'Class5'];

  errorMessage: string = '';

  constructor(private dataService: DataService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loadPage(this.pageNumber, this.pageSize);
  }

  loadPage(page: number, size: number) {
    if (this.selectedClass) {
      this.dataService.getByClass(this.selectedClass, page, size)
        .subscribe((response: PaginatedResponse<Student>) => {
          this.students = response.content;
          this.totalElements = response.totalElements ?? 0;
          this.pageNumber = page;
          this.pageSize = size;
          this.errorMessage = this.students.length === 0 ? 'No students found for this class.' : '';
        });
    } else {
      this.dataService.getPaginated(page, size)
        .subscribe((response: PaginatedResponse<Student>) => {
          this.students = response.content;
          this.totalElements = response.totalElements ?? 0;
          this.pageNumber = page;
          this.pageSize = size;
          this.errorMessage = '';
        });
    }
  }

  onPageChange(event: PageEvent) {
    this.loadPage(event.pageIndex, event.pageSize);
  }

  filterByClass(className: string) {
    this.selectedClass = className;
    this.loadPage(0, this.pageSize);
  }

  selectedStudentId?: number;

  searchById(event: Event) {
    const input = event.target as HTMLInputElement;
    const studentId = input.value.trim();

    this.selectedStudentId = studentId ? Number(studentId) : undefined;

    if (!studentId) {
      this.loadPage(this.pageNumber, this.pageSize);
      this.errorMessage = '';
      return;
    }

    this.dataService.getById(Number(studentId)).subscribe({
      next: (student: Student) => {
        this.students = [student];
        this.totalElements = 1;
        this.errorMessage = '';
      },
      error: (err) => {
        if (err.status === 404) {
          this.students = [];
          this.totalElements = 0;
          this.errorMessage = `Student with ID ${studentId} not found.`;
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      }
    });
  }

  resetFilters(idInput: HTMLInputElement) {
    this.selectedClass = '';
    this.selectedStudentId = undefined;
    idInput.value = '';
    this.errorMessage = '';
    this.loadPage(0, this.pageSize);
  }

  goToGenerate() {
    this.router.navigate(['/generate-excel']);
  }

  goToProcessCsv() {
    this.router.navigate(['/process-csv']);
  }

  goToUploadCsv() {
    this.router.navigate(['/upload-csv']);
  }

  downloadPdf(studentId: number) {
    const url = `http://localhost:8080/api/students/${studentId}/export/pdf`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const fileName = `student-${studentId}.pdf`;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      },
      error: (err) => {
        console.error('Error downloading PDF', err);
        alert('Failed to download PDF');
      }
    });
  }

  downloadExcelReport() {
    this.isLoading = true;

    let params = new HttpParams();
    if (this.selectedClass) params = params.set('className', this.selectedClass);
    if (this.selectedStudentId) params = params.set('studentId', this.selectedStudentId.toString());

    this.http.get('http://localhost:8080/api/excel/export', {
      params,
      responseType: 'blob'
    }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error downloading Excel:', err);
        this.isLoading = false;
        this.errorMessage = 'Failed to download Excel report. Please try again.';
      }
    });
  }

  downloadCsvReport() {
    this.isLoading = true;
    let params = new HttpParams();
    if (this.selectedClass) params = params.set('className', this.selectedClass);
    if (this.selectedStudentId) params = params.set('studentId', this.selectedStudentId.toString());


    this.http.get('http://localhost:8080/api/csv/export', {
      params,
      responseType: 'blob'
    }).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'students.csv';
        link.click();
        window.URL.revokeObjectURL(url);
        this.isLoading = false;
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Error downloading CSV';
      }
    });
  }

}
