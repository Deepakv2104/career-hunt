import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/userProfile/user-profile.service';
import { Job } from '../../services/job/job.model';

@Component({
  selector: 'app-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.css']
})
export class FindJobsComponent implements OnInit {
  isDarkMode = false;
  jobs: Job[] = [];
  selectedJob: Job | null = null;
  searchTerm: string = '';
  locationFilter: string = 'All Locations';
  typeFilter: string = 'All Types';
  experienceFilter: string = 'All Experience Levels';
  domainFilter: string = 'All Domains';

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.userProfileService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  handleCardClick(job: Job) {
    this.selectedJob = job;
  }

  closeSidebar() {
    this.selectedJob = null;
  }

  get filteredJobs() {
    return this.jobs.filter(job => {
      return (
        (this.locationFilter === 'All Locations' || job.location === this.locationFilter) &&
        (this.typeFilter === 'All Types' || job.type === this.typeFilter) &&
        // (this.experienceFilter === 'All Experience Levels' || job.experience === this.experienceFilter) &&
        // (this.domainFilter === 'All Domains' || job.domain === this.domainFilter) &&
        (job.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         job.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    });
  }

  // Toggle dark mode function
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
}
