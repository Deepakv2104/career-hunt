import { Component, Inject, OnInit } from '@angular/core';
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
export class ApplicationDetailsDialogComponent implements OnInit {
  selectedStatus: string;
    activeTab: string = 'Profile';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: JobApplication,
    private jobApplicationService: JobApplicationService,
    private resumeService: ResumeService,
    // private emailService: EmailService
  ) {
    this.selectedStatus = data.status;  // Initialize with the current status
  }
  ngOnInit(): void {
    this.selectedStatus = ""; // Initialize selectedStatus with an empty string
  }
  updateStatus() {
    this.jobApplicationService.updateApplicationStatus(this.data.applicationId, this.selectedStatus).subscribe(
      updatedApplication => {
        console.log('Application status updated:', updatedApplication);
        this.data.status = updatedApplication.status;  // Update local data
  
        if (this.selectedStatus === 'Shortlisted') {
          // Call sendEmailNotification when status is in-progress
          // this.sendEmailNotification(this.data.user.username, this.data.user.email);
          this.sendShortlisted();
          alert("Shortlisted Email Sent")
        }else if (this.selectedStatus === 'ScheduleInterview'){
          this.sendInterview();
          alert("ScheduleInterview Email Sent")
        }else if (this.selectedStatus === 'Selected'){
          this.sendSelection();
          alert("Selected Email Sent")
        }
      },
      error => {
        console.error('Error updating application status:', error);
        // Handle error as needed
      }
    );
  }

  getTomorrowDate(): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    // Extract the day, month, and year
    const day = ("0" + tomorrow.getDate()).slice(-2);
    const month = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
    const year = tomorrow.getFullYear();
  
    // Format as DD-MM-YYYY
    return `${day}-${month}-${year}`;
  }
  
  

  sendShortlisted(){
      emailjs.init('mUxPgkv6Rehc984Rf')
      emailjs.send("service_ci0g3a5","template_2l3o6oh",{
      to_name: this.data.userProfile.user.username,
      to_email: this.data.userProfile.user.email,
      jobRole: this.data.job.role,
      companyName: this.data.job.employer.companyName,
      applicationID: this.data.applicationId,
      reply_to: "no reply",
    });
  }


  sendInterview(){
    emailjs.init('wNgthbHuqilJq0j8y')
    emailjs.send("service_9551kcp","template_lnqm92j",{
      to_name: this.data.userProfile.user.username,
      jobRole: this.data.job.role,
      companyName: this.data.job.employer.companyName,
      date: this.getTomorrowDate(),
      time: "02:00 PM",
      link: "https://meet.google.com/zes-ubej-gce",
      to_email: this.data.userProfile.user.email,
      reply_to: "no reply",
      });
  }

  sendSelection(){
    emailjs.init('wNgthbHuqilJq0j8y')
    emailjs.send("service_9551kcp","template_7hqlx55",{
      to_name: this.data.userProfile.user.username,
      jobRole: this.data.job.role,
      companyName: this.data.job.employer.companyName,
      salary: this.data.job.salary,
      to_email: this.data.userProfile.user.email,
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
