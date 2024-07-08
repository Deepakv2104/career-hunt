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
  minDate: string; // Minimum date for date input

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
      location: ['', Validators.required],
      responsibility: ['', Validators.required],
      requirements: ['', Validators.required],
      lastDateToApply: [null, Validators.required]
    });
    this.minDate = new Date().toISOString().split('T')[0];
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
    console.log('Form submitted:', this.jobForm.valid); // Check form validity
    console.log('Form value:', this.jobForm.value); // Log form values
    this.formSubmitted = true;
    if (this.jobForm.valid && this.employer) {
      const job: Job = {
        ...this.jobForm.value,
        empId: this.employer.empId,
        companyName: this.employer.companyName,
        companyWebsite: this.employer.companyWebsite,
        dateofPosting: new Date() // Automatically set the current date
      };
  
      this.jobService.postJob(job).subscribe(
        (response) => {
          console.log('Job posted successfully:', response);
          this.loadJobs();
          this.jobForm.reset();
          this.formSubmitted = false;
          this.showRecentPosts = true;
        },
        (error) => {
          console.error('Error posting job:', error);
          // Log more details about the error for debugging
          console.error('Error details:', error);
        }
      );
    } else {
      this.jobForm.markAllAsTouched(); // Mark all fields as touched to display validation errors
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const themeClass = this.isDarkMode ? 'dark-theme' : 'light-theme';
    document.body.className = themeClass;
  }

  editJob(job: Job): void {
    // Load job data into the form for editing
    this.jobForm.patchValue({
      role: job.role,
      jobDescription: job.jobDescription,
      type: job.type,
      eligibility: job.eligibility,
      experience: job.experience,
      salary: job.salary,
      location: job.location,
      responsibility: job.responsibility,
      requirements: job.requirements,
      lastDateToApply: new Date(job.lastDateToApply).toISOString().split('T')[0] // Convert date to ISO format
    });
  }

  deleteJob(jobId: number | undefined): void {
    if (jobId && confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(jobId).subscribe(
        () => {
          // Remove job from local array after successful deletion
          this.jobs = this.jobs.filter(job => job.jobId !== jobId);
        },
        (error) => {
          console.error('Error deleting job:', error);
          // Handle error as needed
        }
      );
    } else {
      console.error('Invalid job ID:', jobId);
    }
  }
}
