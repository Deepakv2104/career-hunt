import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { User } from 'src/app/model/user.model';
import { UserProfile } from 'src/app/model/user-profile.model';
import { Employer } from 'src/app/model/employer.model';
import { Job } from 'src/app/model/job.model';
import { JobApplication } from 'src/app/model/job-application.model';
import { Feedback } from 'src/app/model/feedback.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  users: User[] = [];
  userProfiles: UserProfile[] = [];
  employers: Employer[] = [];
  jobs: Job[] = [];
  jobApplications: JobApplication[] = [];
  feedbacks: Feedback[] = [];

  stats: any[] = [];
  last6Months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  userGrowth: number[] = [50, 80, 120, 160, 200, 250];
  maxUserGrowth: number = Math.max(...this.userGrowth);
  jobCategories: string[] = ['IT', 'Finance', 'Marketing', 'Sales', 'Other'];
  applicationStatus: any[] = [
    { label: 'Accepted', percentage: 35 },
    { label: 'Rejected', percentage: 20 },
    { label: 'Pending', percentage: 30 },
    { label: 'In Review', percentage: 15 }
  ];
  employerActivities: any[] = [
    { action: 'New job posted', date: '2 hours ago' },
    { action: 'Application reviewed', date: '1 day ago' },
    { action: 'Candidate hired', date: '3 days ago' },
    { action: 'Profile updated', date: '1 week ago' }
  ];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
      this.updateStats();
    });
    this.adminService.getAllUserProfiles().subscribe(profiles => {
      this.userProfiles = profiles;
      this.updateStats();
    });
    this.adminService.getAllEmployers().subscribe(employers => {
      this.employers = employers;
      this.updateStats();
    });
    this.adminService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.updateStats();
    });
    this.adminService.getAllJobApplications().subscribe(applications => {
      this.jobApplications = applications;
      this.updateStats();
    });
    this.adminService.getAllFeedback().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
      this.updateStats();
    });
  }

  updateStats(): void {
    this.stats = [
      { title: 'Users', value: this.users.length, percentage: (this.users.length / 1000) * 100 },
      { title: 'User Profiles', value: this.userProfiles.length, percentage: (this.userProfiles.length / 1000) * 100 },
      { title: 'Employers', value: this.employers.length, percentage: (this.employers.length / 500) * 100 },
      { title: 'Jobs', value: this.jobs.length, percentage: (this.jobs.length / 2000) * 100 },
      { title: 'Job Applications', value: this.jobApplications.length, percentage: (this.jobApplications.length / 5000) * 100 },
      { title: 'Feedbacks', value: this.feedbacks.length, percentage: (this.feedbacks.length / 1000) * 100 }
    ];
  }

  getColor(index: number): string {
    const colors = ['#4299E1', '#48BB78', '#ECC94B', '#ED64A6', '#9F7AEA', '#ED8936'];
    return colors[index % colors.length];
  }

  getJobCount(category: string): number {
    return this.jobs.filter(job => job.role === category).length;
  }

  getPieSlice(index: number): string {
    const total = this.jobs.length;
    const count = this.getJobCount(this.jobCategories[index]);
    const percentage = count / total;
    
    const startAngle = index === 0 ? 0 : this.jobCategories.slice(0, index).reduce((sum, cat) => sum + this.getJobCount(cat), 0) / total * Math.PI * 2;
    const endAngle = startAngle + percentage * Math.PI * 2;
    
    const x1 = Math.cos(startAngle);
    const y1 = Math.sin(startAngle);
    const x2 = Math.cos(endAngle);
    const y2 = Math.sin(endAngle);
    
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    
    return `M 18 18 L ${18 + x1 * 18} ${18 + y1 * 18} A 18 18 0 ${largeArcFlag} 1 ${18 + x2 * 18} ${18 + y2 * 18} Z`;
  }
}