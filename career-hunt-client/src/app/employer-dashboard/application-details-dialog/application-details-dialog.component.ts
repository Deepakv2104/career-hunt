import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobApplication } from '../../model/job-application.model';
import { JobApplicationService } from '../../services/job-application/job-application.service';
import { NgModel } from '@angular/forms';
import { ResumeService } from '../../services/resume/resume.service';

@Component({
  selector: 'app-application-details-dialog',
  templateUrl: './application-details-dialog.component.html',
})
export class ApplicationDetailsDialogComponent {
  selectedStatus: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: JobApplication,
    private jobApplicationService: JobApplicationService,
    private resumeService: ResumeService
  ) {
    this.selectedStatus = data.status;  // Initialize with the current status
  }

  updateStatus() {
    this.jobApplicationService.updateApplicationStatus(this.data.applicationId, this.selectedStatus).subscribe(
      updatedApplication => {
        console.log('Application status updated:', updatedApplication);
        this.data.status = updatedApplication.status;  // Update local data
      },
      error => {
        console.error('Error updating application status:', error);
      }
    );
  }
  viewResume() {
    this.resumeService.viewResume(this.data.userProfile.resumeFilePath).subscribe(
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
