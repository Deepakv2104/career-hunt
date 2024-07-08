import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job/job.service';
import { Job } from '../../services/job/job.model';
import { EmployerService } from '../../services/employer/employer.service';
import { Employer } from '../../services/employer/employer.model';

@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent implements OnInit {
  jobForm: FormGroup;
  employer: Employer | null = null;
  jobs: Job[] = []; // Array to store posted jobs
  formSubmitted: boolean = false;
  showRecentPosts: boolean = false; // Flag to control recent posts display
  isDarkMode: boolean = false; // Flag to control dark mode

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private employerService: EmployerService
  ) {
    this.jobForm = this.fb.group({
      role: ['', Validators.required],
      jobDescription: ['', Validators.required],
      type: ['', Validators.required],
      eligibility: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      salary: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployerDetails();
    this.loadJobs();
  }

  loadEmployerDetails(): void {
    this.employerService.getProfile().subscribe(
      (employer) => {
        this.employer = employer;
      },
      (error) => {
        console.error('Error fetching employer details:', error);
      }
    );
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe(
      (jobs) => {
        this.jobs = jobs;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.jobForm.valid && this.employer) {
      const job: Job = {
        ...this.jobForm.value,
        empId: this.employer.empId,
        companyName: this.employer.companyName,
        companyWebsite: this.employer.companyWebsite
      };

      this.jobService.postJob(job).subscribe(
        (response) => {
          console.log('Job posted successfully:', response);
          // After posting job, refresh the job list
          this.loadJobs();
          // Reset the form
          this.jobForm.reset();
          this.formSubmitted = false;
          // Show recent posts section after posting a job
          this.showRecentPosts = true;
        },
        (error) => {
          console.error('Error posting job:', error);
        }
      );
    } else {
      this.jobForm.markAllAsTouched();
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const themeClass = this.isDarkMode ? 'dark-theme' : 'light-theme';
    document.body.className = themeClass;
  }
}
