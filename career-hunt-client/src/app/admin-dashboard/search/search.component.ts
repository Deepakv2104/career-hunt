import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { User } from '../../model/user.model';
import { UserProfile } from '../../model/user-profile.model';
import { Employer } from '../../model/employer.model';
import { Job } from '../../model/job.model';
import { JobApplication } from '../../model/job-application.model';
import { Feedback } from '../../model/feedback.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  userProfiles: UserProfile[] = [];
  employers: Employer[] = [];
  jobs: Job[] = [];
  jobApplications: JobApplication[] = [];
  feedbacks: Feedback[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadUserProfiles();
    this.loadEmployers();
    this.loadJobs();
    this.loadJobApplications();
    this.loadFeedback();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users.slice(0, 5); // Limit to 5 users for example
    });
  }

  loadUserProfiles(): void {
    this.adminService.getAllUserProfiles().subscribe(userProfiles => {
      this.userProfiles = userProfiles.slice(0, 5); // Limit to 5 user profiles for example
    });
  }

  loadEmployers(): void {
    this.adminService.getAllEmployers().subscribe(employers => {
      this.employers = employers.slice(0, 5); // Limit to 5 employers for example
    });
  }

  loadJobs(): void {
    this.adminService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs.slice(0, 5); // Limit to 5 jobs for example
    });
  }

  loadJobApplications(): void {
    this.adminService.getAllJobApplications().subscribe(jobApplications => {
      this.jobApplications = jobApplications.slice(0, 5); // Limit to 5 job applications for example
    });
  }

  loadFeedback(): void {
    this.adminService.getAllFeedback().subscribe(feedbacks => {
      this.feedbacks = feedbacks.slice(0, 5); // Limit to 5 feedbacks for example
    });
  }
}
