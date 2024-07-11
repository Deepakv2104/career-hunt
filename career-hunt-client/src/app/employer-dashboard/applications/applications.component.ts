import { Component, Inject, OnInit } from '@angular/core';
import { JobApplication } from '../../model/job-application.model';
import { JobApplicationService } from '../../services/job-application/job-application.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { ApplicationDetailsDialogComponent } from '../application-details-dialog/application-details-dialog.component';
import { ResumeService } from '../../services/resume/resume.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications: JobApplication[] = [];

  constructor(
    private jobApplicationService: JobApplicationService,
    private dialog: MatDialog,
    private resumeService: ResumeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadApplicationsForEmployer();
  }



  loadApplicationsForEmployer() {
    this.jobApplicationService.getApplicationsForEmployer().subscribe(
      (applications: JobApplication[]) => {
        this.applications = applications;
      },
      (error) => {
        console.log('Error fetching applications:', error);
        // Handle error as needed, e.g., show an error message
      }
    );
  }

  openApplicationDetailsDialog(application: JobApplication): void {
    const dialogRef = this.dialog.open(ApplicationDetailsDialogComponent, {
      width: '500px',
      data: application
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle dialog close if needed
    });
  }

  viewResume(resumeFilePath: string) {
    this.resumeService.viewResume(resumeFilePath).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error) => {
        console.error('Error fetching resume:', error);
      }
    );
  }
}
