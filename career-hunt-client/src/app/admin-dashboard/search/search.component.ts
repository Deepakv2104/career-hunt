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
  filteredUsers: User[] = [];
  filteredUserProfiles: UserProfile[] = [];
  filteredEmployers: Employer[] = [];
  filteredJobs: Job[] = [];
  filteredJobApplications: JobApplication[] = [];
  filteredFeedbacks: Feedback[] = [];
  activeFilter: string = 'users';

  

  searchQuery: string = '';
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadUserProfiles();
    this.loadEmployers();
    this.loadJobs();
    this.loadJobApplications();
    this.loadFeedback();
  }

  filterData(filter: string) {
    this.activeFilter = filter;
    // Optionally reset searchQuery here if needed
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users.slice(0, 5); // Limit to 5 users for example
      this.filteredUsers = this.users; // Initialize filtered data
      this.applySearch(); // Apply initial search
    });
  }

  loadUserProfiles(): void {
    this.adminService.getAllUserProfiles().subscribe(userProfiles => {
      this.userProfiles = userProfiles.slice(0, 5); // Limit to 5 user profiles for example
      this.filteredUserProfiles = this.userProfiles; // Initialize filtered data
      this.applySearch(); // Apply initial search

    });
  }

  loadEmployers(): void {
    this.adminService.getAllEmployers().subscribe(employers => {
      this.employers = employers.slice(0, 5); // Limit to 5 employers for example
      this.filteredEmployers = this.employers; // Initialize filtered data
      this.applySearch(); // Apply initial search
    });
  }

  loadJobs(): void {
    this.adminService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs.slice(0, 5); // Limit to 5 jobs for example
      this.filteredJobs = this.jobs; // Initialize filtered data
      this.applySearch(); // Apply initial search
    });
  }

  loadJobApplications(): void {
    this.adminService.getAllJobApplications().subscribe(jobApplications => {
      this.jobApplications = jobApplications.slice(0, 5); // Limit to 5 job applications for example
      this.filteredJobApplications = this.jobApplications; // Initialize filtered data
      this.applySearch(); // Apply initial search
    });
  }

  loadFeedback(): void {
    this.adminService.getAllFeedback().subscribe(feedbacks => {
      this.feedbacks = feedbacks.slice(0, 5); // Limit to 5 feedbacks for example
      this.filteredFeedbacks = this.feedbacks; // Initialize filtered data
      this.applySearch(); // Apply initial search
    });
  }
  applySearch(): void {
    const query = this.searchQuery.toLowerCase().trim();

    // Filter users
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(query)
    );

    // Filter user profiles
    this.filteredUserProfiles = this.userProfiles.filter(profile =>
      profile.user.username.toLowerCase().includes(query) ||
      profile.gender.toLowerCase().includes(query) ||
      profile.keySkills.some(skill => skill.toLowerCase().includes(query))
    );

    // Filter employers (example filter based on company name)
    this.filteredEmployers = this.employers.filter(employer =>
      employer.companyName.toLowerCase().includes(query)
    );

    // Filter jobs (example filter based on job role)
    this.filteredJobs = this.jobs.filter(job =>
      job.role.toLowerCase().includes(query)
    );

 
  }
}
