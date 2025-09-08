import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-generate-student',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './generate-student.component.html',
  styleUrls: ['./generate-student.component.scss']
})
export class GenerateStudentComponent {
  recordCount: number = 1000;
  message: string = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  // generateExcel() {
  //   if (this.recordCount <= 0) {
  //     this.message = 'Please enter a valid number of records.';
  //     return;
  //   }

  //   const url = `/api/data/generate?count=${this.recordCount}`;

  //   this.http.get(url, { responseType: 'blob' }).subscribe({
  //     next: (blob) => {
  //       // Download the file
  //       const fileName = `students-${this.recordCount}.xlsx`;
  //       const link = document.createElement('a');
  //       const url = window.URL.createObjectURL(blob);
  //       link.href = url;
  //       link.download = fileName;
  //       link.click();
  //       window.URL.revokeObjectURL(url);

  //       this.message = `Excel file generated successfully: ${fileName}`;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.message = 'Error generating Excel file. Check server logs.';
  //     }
  //   });
  // }
  // private base = 'http://localhost:8080/api/data';


//   generateExcel() {
//   this.http.post('http://localhost:8080/api/data/generate?count=' + this.recordCount, null, { responseType: 'text' })
//     .subscribe({
//       next: (msg) => this.message = msg,
//       error: (err) => this.message = 'Error generating file'
//     });
// }

generateExcel() {
  if (!this.recordCount || this.recordCount <= 0) {
    this.message = 'Please enter a valid record count';
    return;
  }

  this.isLoading = true;
  this.message = '';

  this.http.post(
    'http://localhost:8080/api/data/generate?count=' + this.recordCount,
    null,
    { responseType: 'text' }
  ).subscribe({
    next: (msg) => {
      this.message = msg;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error generating Excel:', err);
      this.message = 'Error generating file';
      this.isLoading = false;
    }
  });
}


}
