import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isDarkMode = false;

  featuredJobs = [
    { title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA' },
    { title: 'Product Manager', company: 'Facebook', location: 'Menlo Park, CA' },
    { title: 'UX Designer', company: 'Amazon', location: 'Seattle, WA' }
  ];

  companyLogos = [
    'assets/logo1.png',
    'assets/logo2.png',
    'assets/logo3.png',
    'assets/logo4.png'
  ];

  testimonials = [
    { message: 'Career Hunt helped me find my dream job!', name: 'Alice' },
    { message: 'The job search process was so easy and efficient.', name: 'Bob' },
    { message: 'I landed a job within a week of signing up!', name: 'Charlie' }
  ];

  randomImages = [
    'assets/random1.jpg',
    'assets/random2.jpg',
    'assets/random3.jpg',
    'assets/random4.jpg',
    'assets/random5.jpg'
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

}
