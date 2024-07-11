import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/userProfile/user-profile.service';  // Adjust the import path as needed
import { Job } from '../../model/job.model';  // Adjust the import path as needed
import { JobApplicationService } from 'src/app/services/job-application/job-application.service';
import { JobApplication } from '../../model/job-application.model'; // Adjust the import path as needed
import { UserProfile } from 'src/app/model/user-profile.model';

@Component({
  selector: 'app-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.css']
})
export class FindJobsComponent implements OnInit {
  user: UserProfile | null = null;

  isDarkMode = false;
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  selectedJob: Job | null = null;
  searchTerm: string = '';
  locationFilter: string = 'All Locations';
  typeFilter: string = 'All Types';
  experienceFilter: string = 'All Experience Levels';
  domainFilter: string = 'All Domains';
  locations: string[] = [];
  types: string[] = [];
  experiences: string[] = [];
  domains: string[] = [];

  constructor(private userProfileService: UserProfileService,private jobApplicationService: JobApplicationService) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  loadProfileDetails(): void {
    this.userProfileService.getProfile().subscribe(
      (userProfile) => {
        this.user = userProfile;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  fetchJobs() {
    this.userProfileService.getAllJobs().subscribe(
      (data: Job[]) => {
        this.jobs = data;
        this.filteredJobs = data;
        this.initializeFilters();
      },
      (error) => {
        console.error('Error fetching jobs', error);
      }
    );
  }

  initializeFilters() {
    this.locations = ['All Locations', ...new Set(this.jobs.map(job => job.location))];
    this.types = ['All Types', ...new Set(this.jobs.map(job => job.type))];
    this.experiences = ['All Experience Levels', ...new Set(this.jobs.map(job => job.experience.toString()))];
    // Assuming job.domain exists
    // this.domains = ['All Domains', ...new Set(this.jobs.map(job => job.domain))];
  }

  handleCardClick(job: Job) {
    this.selectedJob = job;
  }

  closeSidebar() {
    this.selectedJob = null;
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter(job => {
      return (
        (this.locationFilter === 'All Locations' || job.location === this.locationFilter) &&
        (this.typeFilter === 'All Types' || job.type === this.typeFilter) &&
        (this.experienceFilter === 'All Experience Levels' || job.experience.toString() === this.experienceFilter) &&
        // (this.domainFilter === 'All Domains' || job.domain === this.domainFilter) &&
        (job.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         job.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.documentElement;
    if (htmlElement) {
      if (this.isDarkMode) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
  applyForJob(jobId?: number) {
    if (jobId===undefined) {
      console.error('Job ID is undefined');
      alert('Invalid job selection. Please try again.');
      return;
    }
    if (!this.user) {
      // Show alert or notification to update profile
      alert('Please update your profile before applying the job.');
      return;
    }
  
    this.jobApplicationService.applyForJob(jobId).subscribe(
      response => {
        console.log('Job application successful', response);
        alert('You have successfully applied for the job!');
        // Optionally, update UI or handle application success
      },
      error => {
        console.error('you already applied for this role', error);
        alert('you already applied for this role.');
        // Optionally, update UI or handle application error
      }
    );
  }
  
  
}
