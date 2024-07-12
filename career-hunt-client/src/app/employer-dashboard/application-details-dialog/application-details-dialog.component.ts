import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobApplication } from '../../model/job-application.model';
import { JobApplicationService } from '../../services/job-application/job-application.service';
import { NgModel } from '@angular/forms';
import { ResumeService } from '../../services/resume/resume.service';
import { EmailJSResponseStatus } from '@emailjs/browser';
import emailjs from '@emailjs/browser'
// import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-application-details-dialog',
  templateUrl: './application-details-dialog.component.html',
})
export class ApplicationDetailsDialogComponent {
  selectedStatus: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: JobApplication,
    private jobApplicationService: JobApplicationService,
    private resumeService: ResumeService,
    // private emailService: EmailService
  ) {
    this.selectedStatus = data.status;  // Initialize with the current status
  }

  updateStatus() {
    this.jobApplicationService.updateApplicationStatus(this.data.applicationId, this.selectedStatus).subscribe(
      updatedApplication => {
        console.log('Application status updated:', updatedApplication);
        this.data.status = updatedApplication.status;  // Update local data
  
        if (this.selectedStatus === 'Shortlisted') {
          // Call sendEmailNotification when status is in-progress
          // this.sendEmailNotification(this.data.user.username, this.data.user.email);
          this.asend()
          alert("email sent")
        }
      },
      error => {
        console.error('Error updating application status:', error);
        // Handle error as needed
      }
    );
  }
  

  asend(){
emailjs.init('mUxPgkv6Rehc984Rf')
emailjs.send("service_ci0g3a5","template_2l3o6oh",{
  to_name: this.data.userProfile.user.username,
  to_email:this.data.userProfile.user.email,
  jobRole: this.data.job.role,
  companyName: this.data.job.employer.companyName,
  applicationID: this.data.applicationId,
  reply_to: "no reply",
  });
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
