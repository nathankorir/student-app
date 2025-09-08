import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { GenerateStudentComponent } from './components/generate-student/generate-student.component';
import { ProcessCsvComponent } from './components/process-csv/process-csv.component';
import { UploadCsvComponent } from './components/upload-csv/upload-csv.component';

export const routes: Routes = [
    { path: '', component: StudentListComponent },
    { path: 'generate-excel', component: GenerateStudentComponent },
    { path: 'process-csv', component: ProcessCsvComponent },
    { path: 'upload-csv', component: UploadCsvComponent },
    { path: '**', redirectTo: '' }
];
