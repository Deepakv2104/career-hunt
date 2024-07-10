import { Component } from '@angular/core';

interface Person {
  id: number;
  img: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: string[];
}

@Component({
  selector: 'app-find-people',
  templateUrl: './find-people.component.html',
  styleUrls: ['./find-people.component.css']
})
export class FindPeopleComponent {
  peopleList: Person[] = [
    {
      id: 1,
      img: '',
      name: 'Tehith',
      role: 'Student',
      location: 'Vemulawada, Telangana',
      bio: 'Passionate about creating efficient and scalable web applications. Experienced in full-stack development with a focus on JavaScript technologies.',
      skills: ['JavaScript', 'React', 'Angular', 'SpringBoot', 'MongoDB', 'SQL']
    },
    {
      id: 2,
      img: './Deepak.png',
      name: 'Deepak Vishwakarma',
      role: 'Student',
      location: 'Hyderabad, Telangana',
      bio: 'Passionate about creating efficient and scalable web applications. Experienced in full-stack development with a focus on JavaScript technologies',
      skills: ['ReactJs', 'Angular', 'NodeJs', 'Express', 'SpringBoot', 'SQL']
    },
    {
      id: 3,
      img: '',
      name: 'Saikiran',
      role: 'Student',
      location: 'Hyderabad, Telangana',
      bio: 'Experienced in machine learning and big data analytics.',
      skills: ['Python', 'TensorFlow', 'SQL']
    }
    // Add more persons as needed
  ];

  isSidebarOpen: boolean = false;

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  getDefaultImage(): string {
    return 'https://via.placeholder.com/150'; // Replace with your default image URL
  }
}
