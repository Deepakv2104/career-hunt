import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/userProfile/user-profile.service';  // Adjust the import path as needed
import { Job } from '../../model/job.model';  // Adjust the import path as needed
import { JobApplicationService } from 'src/app/services/job-application/job-application.service';
import { JobApplication } from '../../model/job-application.model'; // Adjust the import path as needed
import { UserProfile } from 'src/app/model/user-profile.model';
import { EmailJSResponseStatus } from '@emailjs/browser';
import emailjs from '@emailjs/browser'
import { AuthService } from 'src/app/services/auth/auth.service';

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
  username = '';
  email = ''
  constructor(private userProfileService: UserProfileService,private jobApplicationService: JobApplicationService, public authService: AuthService) { }

  ngOnInit(): void {
    this.fetchJobs();
    this.authService.isLoggedInObservable().subscribe(loggedIn => {
      if (loggedIn) {
        this.username = this.authService.getUsername() || '';
        this.email = this.authService.getUserEmail() || '';
      } else {
        this.username = ''; // Reset username if not logged in
        this.email = '';
      }
    });
    
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



  applyForJob(jobId?: number,companyName?:string,companyEmail?:string,role?:string) {
    if (!jobId) {
      console.error('Job ID is undefined');
      alert('Invalid job selection. Please try again.');
     
     
        
      return;
    }
  
    // Check if the user profile exists
    this.userProfileService.getProfile().subscribe(
      (userProfile) => {
        if (userProfile) {
          // User profile exists, proceed with job application
          this.jobApplicationService.applyForJob(jobId).subscribe(
            (response) => {
              console.log('Job application successful', response);
              alert('You have successfully applied for the job!');
              emailjs.init('mUxPgkv6Rehc984Rf')
            emailjs.send("service_ci0g3a5","template_ifwkf9o",{
              from_name:"CareerHunt",
              to_name: this.username,
              jobrole:role,
              to_email: this.email,
              companyName:companyName,
              reply_to: "",
              });
          
            },
            (error) => {
              console.error('Error applying for the job', error);
              alert('You have already applied for this role.');
            }
          );
        } else {
          // User profile does not exist, show alert
          alert('Please update your profile before applying for a job.');
        }
      },
      (error) => {
        console.error('Error fetching user profile', error);
        alert('Please update your profile before applying for a job.');
      }
    );
  }
  
  
}
