import { Component, OnInit } from '@angular/core';
import jobsData from './jobs';  // Ensure this import is correctly pointing to your jobs data file

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  domain: string;
  description: string;
  datePosted: string;
  responsibilities: string;
  requirements: string;
} 

@Component({
  selector: 'app-find-jobs',
  templateUrl: './find-jobs.component.html',
  styleUrls: ['./find-jobs.component.css']
})
export class FindJobsComponent implements OnInit {
  isDarkMode = false;
  jobs: Job[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-level',
      domain: 'Software Development',
      description: 'We are looking for a skilled frontend developer to join our team. You will be working with the latest technologies to build innovative products.',
      datePosted: '2 days ago',
      responsibilities: 'Develop new user-facing features, Build reusable code and libraries for future use, Ensure the technical feasibility of UI/UX designs, Optimize application for maximum speed and scalability.',
      requirements: 'Proven work experience as a Frontend Developer, In-depth understanding of the entire web development process, Hands-on experience with markup languages, Experience with JavaScript, CSS, and React.js.'
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'DevSolutions',
      location: 'New York, NY',
      type: 'Part-time',
      experience: 'Senior',
      domain: 'Software Development',
      description: 'Seeking an experienced backend developer to support our growing platform. You will be responsible for managing the interchange of data between the server and the users.',
      datePosted: '1 week ago',
      responsibilities: 'Integration of user-facing elements developed by front-end developers with server-side logic, Building reusable code and libraries for future use, Optimization of the application for maximum speed and scalability, Implementation of security and data protection.',
      requirements: 'Proven work experience as a Backend Developer, Hands-on experience with programming languages like Java, Ruby, PHP, and Python, Familiarity with front-end languages (e.g., HTML, JavaScript, and CSS).'
    },
    {
      id: 3,
      title: 'Graphic Designer',
      company: 'Creatives Inc.',
      location: 'San Francisco, CA',
      type: 'Contract',
      experience: 'Junior',
      domain: 'Design',
      description: 'We are looking for a creative Graphic Designer to join our team. You will be responsible for creating visual concepts that inspire, inform, and captivate consumers.',
      datePosted: '3 days ago',
      responsibilities: 'Create visual aspects of marketing materials, websites, and other media, Put together disparate elements of a design created by other professionals, Ensure consistent visual language across all communication channels.',
      requirements: 'Proven work experience as a Graphic Designer, Proficiency in design software such as Adobe Illustrator, Photoshop, and InDesign, A keen eye for aesthetics and details.'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'DataPro',
      location: 'Boston, MA',
      type: 'Full-time',
      experience: 'Mid-level',
      domain: 'Data Science',
      description: 'We are looking for a Data Scientist to analyze large amounts of raw information to find patterns and insights that will help improve our company.',
      datePosted: '5 days ago',
      responsibilities: 'Identify valuable data sources and automate collection processes, Undertake preprocessing of structured and unstructured data, Analyze large amounts of information to discover trends and patterns.',
      requirements: 'Proven experience as a Data Scientist, Knowledge of R, SQL, and Python, Experience with data visualization tools such as Tableau or PowerBI.'
    },
  ];
  selectedJob: Job | null = null;
  searchTerm: string = '';
  locationFilter: string = 'All Locations';
  typeFilter: string = 'All Types';
  experienceFilter: string = 'All Experience Levels';
  domainFilter: string = 'All Domains';

  constructor() { }

  ngOnInit(): void { }

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
        (this.experienceFilter === 'All Experience Levels' || job.experience === this.experienceFilter) &&
        (this.domainFilter === 'All Domains' || job.domain === this.domainFilter) &&
        (job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         job.company.toLowerCase().includes(this.searchTerm.toLowerCase()))
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
