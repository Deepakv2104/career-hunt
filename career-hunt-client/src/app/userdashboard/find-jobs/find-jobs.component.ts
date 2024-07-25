import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/userProfile/user-profile.service';
import { Job } from '../../model/job.model';
import { JobApplicationService } from 'src/app/services/job-application/job-application.service';
import { UserProfile } from 'src/app/model/user-profile.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import emailjs from '@emailjs/browser';

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
  recommendedJobs: Job[] = [];
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
  email = '';

  constructor(
    private userProfileService: UserProfileService,
    private jobApplicationService: JobApplicationService,
    public authService: AuthService
  ) { }
  mainCitiesOfIndia: string[] = [
    'All Locations',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Surat',
    'Pune',
    'Jaipur',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Pimpri-Chinchwad',
    'Patna',
    'Vadodara',
    'Ghaziabad',
    'Ludhiana',
    'Agra',
    'Nashik',
    'Faridabad',
    'Meerut',
    'Rajkot',
    'Kalyan-Dombivli'
  ];

  ngOnInit(): void {
    this.fetchJobs();
    this.loadProfileDetails();
    this.authService.isLoggedInObservable().subscribe(loggedIn => {
      if (loggedIn) {
        this.username = this.authService.getUsername() || '';
        this.email = this.authService.getUserEmail() || '';
      } else {
        this.username = '';
        this.email = '';
      }
    });
  }

  loadProfileDetails(): void {
    this.userProfileService.getProfile().subscribe(
      (userProfile) => {
        this.user = userProfile;
        this.filterRecommendedJobs();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  fetchJobs(): void {
    this.userProfileService.getAllJobs().subscribe(
      (data: Job[]) => {
        this.jobs = data;
        this.filteredJobs = data;
        this.initializeFilters();
        this.filterRecommendedJobs(); // Ensure recommended jobs are updated after fetching all jobs
      },
      (error) => {
        console.error('Error fetching jobs', error);
      }
    );
  }

  initializeFilters(): void {
    this.locations = ['All Locations', ...new Set(this.jobs.map(job => job.location))];
    this.types = ['All Types', ...new Set(this.jobs.map(job => job.type))];
    this.experiences = ['All Experience Levels', ...new Set(this.jobs.map(job => job.experience.toString()))];
  }

  handleCardClick(job: Job): void {
    this.selectedJob = job;
  }

  closeSidebar(): void {
    this.selectedJob = null;
  }

  filterJobs(): void {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesLocation = this.locationFilter === 'All Locations' || job.location === this.locationFilter;
      const matchesType = this.typeFilter === 'All Types' || job.type === this.typeFilter;
      const matchesSearchTerm = job.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      let matchesExperience = true;
      if (this.experienceFilter !== 'All Experience Levels') {
        const experience = job.experience;
        switch (this.experienceFilter) {
          case '0-2':
            matchesExperience = experience >= 0 && experience <= 2;
            break;
          case '3-5':
            matchesExperience = experience >= 3 && experience <= 5;
            break;
          case '6-10':
            matchesExperience = experience >= 6 && experience <= 10;
            break;
          case '10+':
            matchesExperience = experience >= 10;
            break;
          default:
            matchesExperience = true;
        }
      }
  
      return matchesLocation && matchesType && matchesExperience && matchesSearchTerm;
    });
  }
  

  filterRecommendedJobs(): void {
    if (!this.user || !this.user.keySkills) {
      this.recommendedJobs = [];
      return;
    }
  
    const userSkills = this.user.keySkills.map(skill => skill.toLowerCase());
  
    this.recommendedJobs = this.jobs.filter(job => {
      const jobRequirements = job.requirements.toLowerCase().split(/\W+/);
      const matchedSkills = jobRequirements.filter(requirement => userSkills.includes(requirement));
  
      if (matchedSkills.length > 0) {
        console.log(`Job ID: ${job.jobId}, Matched Skills: ${matchedSkills.join(', ')}`);
        return true;
      }
  
      return false;
    });
  }
  

  toggleDarkMode(): void {
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

  applyForJob(jobId?: number, companyName?: string, companyEmail?: string, role?: string): void {
    if (!jobId) {
      console.error('Job ID is undefined');
      alert('Invalid job selection. Please try again.');
      return;
    }

    this.userProfileService.getProfile().subscribe(
      (userProfile) => {
        if (userProfile) {
          this.jobApplicationService.applyForJob(jobId).subscribe(
            (response) => {
              console.log('Job application successful', response);
              alert('You have successfully applied for the job!');
              emailjs.init('mUxPgkv6Rehc984Rf');
              emailjs.send("service_ci0g3a5", "template_ifwkf9o", {
                from_name: "CareerHunt",
                to_name: this.username,
                jobrole: role,
                to_email: this.email,
                companyName: companyName,
                reply_to: ""
              });
            },
            (error) => {
              console.error('Error applying for the job', error);
              alert('You have already applied for this role.');
            }
          );
        } else {
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
