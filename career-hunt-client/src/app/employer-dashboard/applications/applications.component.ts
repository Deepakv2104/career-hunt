import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../../services/job-application/job-application.model';
import { JobApplicationService } from '../../services/job-application/job-application.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationDetailsDialogComponent } from '../application-details-dialog/application-details-dialog.component';
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications: JobApplication[] = [];

  constructor(private jobApplicationService: JobApplicationService,private dialog: MatDialog) { }

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
}
