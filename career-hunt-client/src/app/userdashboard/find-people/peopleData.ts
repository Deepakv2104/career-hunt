// src/assets/people-data.ts

export interface Person {
  id: number;
  img:string;
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
}

export const people: Person[] = [
  {
    id: 1,
    img:'',
    name: 'Tehith',
    role: 'Student',
    location: 'Vemulawada, Telangana',
    bio: 'Passionate about creating efficient and scalable web applications. Experienced in full-stack development with a focus on JavaScript technologies.',
    skills: ['JavaScript', 'React', 'Angular', 'SpringBoot', 'MongoDB', 'SQL'],
    experience: '2 years'
  },
  {
    id: 2,
    img:'./Deepak_248_M.jpg',

    name: 'Deepak Vishwakarma',
    role: 'Student',
    location: 'Hyderabad, Telangana',
    bio: 'Passionate about creating efficient and scalable web applications. Experienced in full-stack development with a focus on JavaScript technologies',
    skills: ['ReactJs','Angular', 'NodeJs', 'Express', 'SpringBoot', 'SQL'],
    experience: '2 years'
  },
  {
    id: 3,
    img:'',

    name: 'Saikiran',
    role: 'Student',
    location: 'Hyderabad, Telangana',
    bio: 'Experienced in machine learning and big data analytics.',
    skills: ['Python', 'TensorFlow', 'SQL'],
    experience: '2 years'
  },
  // Add more persons as needed
];
