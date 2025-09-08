import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-process-csv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './process-csv.component.html',
  styleUrls: ['./process-csv.component.scss']
})
export class ProcessCsvComponent implements OnInit {

  files: string[] = [];
  selectedFile: string = '';
  message: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.http.get<string[]>('http://localhost:8080/api/data/files?type=excel')
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

    this.http.post('http://localhost:8080/api/data/convert', null, { params, responseType: 'text' })
      .subscribe({
        next: msg => this.message = msg,
        error: err => this.message = 'Error converting Excel to CSV'
      });
  }
}
