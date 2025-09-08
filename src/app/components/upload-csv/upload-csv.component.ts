import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-csv',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {
  files: string[] = [];
  selectedFile: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCsvFiles();
  }

  loadCsvFiles() {
    this.http.get<string[]>('http://localhost:8080/api/data/files?type=csv')
      .subscribe({
        next: data => this.files = data,
        error: err => this.message = 'Error loading CSV files from server'
      });
  }

  uploadCsv() {
    if (!this.selectedFile) {
      this.message = 'Please select a CSV file';
      return;
    }

    // const csvPath = `/var/log/applications/API/dataprocessing/${this.selectedFile}`;
    const params = new HttpParams().set('csvName', this.selectedFile);

    this.http.post('http://localhost:8080/api/data/upload', null, { params, responseType: 'text' })
      .subscribe({
        next: res => this.message = res,
        error: err => this.message = 'Error uploading CSV to DB'
      });
  }
}
