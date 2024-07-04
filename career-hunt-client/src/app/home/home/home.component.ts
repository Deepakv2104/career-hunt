import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isDarkMode = false;

// Update the featuredJobs array with image URLs
featuredJobs = [
  {
    title: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
    salary: '$120,000 - $180,000',
    experience: '3-5 years',
    employmentType: 'Full-time',
    skills: ['JavaScript', 'Python', 'Cloud Computing', 'Algorithms'],
    description: 'Join our team to build innovative solutions that impact billions of users worldwide.',
    postedDate: '2024-06-15'
  },
  {
    title: 'Product Manager',
    company: 'Facebook',
    location: 'Menlo Park, CA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    salary: '$130,000 - $190,000',
    experience: '5+ years',
    employmentType: 'Full-time',
    skills: ['Product Strategy', 'Data Analysis', 'User Experience', 'Agile'],
    description: 'Lead the development of cutting-edge social media products used by millions.',
    postedDate: '2024-06-20'
  },
  {
    title: 'UX Designer',
    company: 'Amazon',
    location: 'Seattle, WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    salary: '$100,000 - $150,000',
    experience: '2-4 years',
    employmentType: 'Full-time',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    description: 'Create intuitive and engaging user experiences for our e-commerce platform.',
    postedDate: '2024-06-18'
  }
];
  companyLogos = [
    'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    '../../../assets/techm_logo.png'
  ];

testimonials = [
  { message: 'Career Hunt helped me find my dream job!', name: 'Alice Johnson', rating: 5 },
  { message: 'The job search process was so easy and efficient.', name: 'Bob Smith', rating: 4 },
  { message: 'I landed a job within a week of signing up!', name: 'Charlie Brown', rating: 3 }
];
  
randomImages = [
  '../../../assets/comun1.jpg',
  '../../../assets/comun3.jpg',
  '../../../assets/comun2.jpg',
  '../../../assets/comun5.jpg',
  '../../../assets/comun6.jpg',
  '../../../assets/comun4.jpg',

];

  constructor() { }

  // Toggle dark mode function (you may want to use a service for consistency across components)
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      this.isDarkMode ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark');
    }
  }
  ngOnInit(): void {
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
