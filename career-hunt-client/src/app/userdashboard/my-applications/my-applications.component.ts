import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from '../../services/job-application/job-application.service'; // Adjust the import path as needed
import { JobApplication } from '../../services/job-application/job-application.model'; // Adjust the import path as needed

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css']
})
export class MyApplicationsComponent implements OnInit {
  applications: JobApplication[] = [];

  constructor(private jobApplicationService: JobApplicationService) { }

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications() {
    this.jobApplicationService.getApplicationsForUser().subscribe(
      (data: JobApplication[]) => {
       
        this.applications = data;
      },
      (error) => {
        console.error('Error fetching job applications', error);
      }
    );

  }
}
