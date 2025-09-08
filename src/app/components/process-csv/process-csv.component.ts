import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-process-csv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './process-csv.component.html',
  styleUrls: ['./process-csv.component.scss']
})
export class ProcessCsvComponent implements OnInit {

  files: string[] = [];
  selectedFile: string = '';
  message: string = '';
  isLoading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.http.get<string[]>('http://localhost:8080/api/files?type=excel')
      .subscribe({
        next: data => this.files = data,
        error: err => this.message = 'Error loading files from server'
      });
  }

  processCsv() {
    if (!this.selectedFile) {
      this.message = 'Please select a file';
      return;
    }

    const csvName = this.selectedFile.replace('.xlsx', '.csv');

    const params = new HttpParams()
      .set('excelName', this.selectedFile)
      .set('csvName', csvName);

    this.isLoading = true;
    this.message = '';

    this.http.post('http://localhost:8080/api/csv/convert', null, {
      params,
      responseType: 'text'
    }).subscribe({
      next: msg => {
        this.message = msg;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error converting Excel:', err);
        this.message = 'Error converting Excel to CSV';
        this.isLoading = false;
      }
    });
  }
}
