import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job/job.service';
import { Job } from '../../model/job.model';
import { EmployerService } from '../../services/employer/employer.service';
import { Employer } from '../../model/employer.model';

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
  editMode: boolean = false; // Flag to track if editing mode is active
  editingJobId: number | undefined; // ID of the job being edited
  paginatedJobs: Job[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  loading: boolean = true;

  jobRoles: string[] = [
    'Software Developer',
    'Software Engineer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Data Scientist',
    'Product Manager',
    'Project Manager',
    'Business Analyst',
    'Quality Assurance Engineer',
    'System Administrator',
    'Network Engineer',
    'Database Administrator',
    'DevOps Engineer',
    'UX/UI Designer',
    'Graphic Designer',
    'Marketing Manager',
    'Sales Representative',
    'Customer Service Representative',
    'Human Resources Manager',
    'Financial Analyst',
    'Accountant',
    'Operations Manager',
    'Content Writer',
    'Social Media Manager',
    'Administrative Assistant'
  ];
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
        this.loading = false;
        this.updatePaginatedJobs(); // Update paginated jobs after loading
      },
      (error) => {
        console.error('Error fetching jobs:', error);
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      console.error('Form invalid. Cannot submit.');
      alert('Please fill out all required fields correctly.');
      return;
    }

    this.formSubmitted = true;

    if (!this.employer) {
      alert('Please update your profile before posting a job.');
      return;
    }

    const formData = this.jobForm.value;
    const job: Job = {
      ...formData,
      empId: this.employer.empId,
      companyName: this.employer.companyName,
      companyWebsite: this.employer.companyWebsite,
      dateofPosting: new Date()
    };

    if (this.editMode && this.editingJobId) {
      this.updateJob(job);
    } else {
      this.postNewJob(job);
    }
  }

  postNewJob(job: Job): void {
    if (this.jobForm.invalid) {
      console.error('Form invalid. Cannot submit.');
      return;
    }
    this.jobService.postJob(job).subscribe(
      (response) => {
        console.log('Job posted successfully:', response);
        alert('Job posted successfully.');
        this.loadJobs();
        this.jobForm.reset();
        this.formSubmitted = false;
        this.showRecentPosts = true;
      },
      (error) => {
        console.error('Error posting job:', error);
        alert('Error posting job. Please try again.');
      }
    );
  }

  updateJob(job: Job): void {
    if (this.editingJobId !== undefined) {
      this.jobService.updateJob(this.editingJobId, job).subscribe(
        (response) => {
          console.log('Job updated successfully:', response);
          alert('Job updated successfully.');
          this.loadJobs();
          this.jobForm.reset();
          this.formSubmitted = false;
          this.showRecentPosts = true;
          this.editMode = false;
          this.editingJobId = undefined;
        },
        (error) => {
          console.error('Error updating job:', error);
          alert('Error updating job. Please try again.');
        }
      );
    } else {
      console.error('Invalid editingJobId:', this.editingJobId);
      alert('Error updating job. Invalid editing job ID.');
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const themeClass = this.isDarkMode ? 'dark-theme' : 'light-theme';
    document.body.className = themeClass;
  }

  editJob(job: Job): void {
    this.editMode = true;
    this.editingJobId = job.jobId; // Set the editing job ID
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
          this.jobs = this.jobs.filter(job => job.jobId !== jobId);
          this.updatePaginatedJobs(); // Update paginated jobs after deletion
        },
        (error) => {
          console.error('Error deleting job:', error);
        }
      );
    } else {
      console.error('Invalid job ID:', jobId);
    }
  }

  updatePaginatedJobs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobs = this.jobs.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.jobs.length) {
      this.currentPage++;
      this.updatePaginatedJobs();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedJobs();
    }
  }
}

