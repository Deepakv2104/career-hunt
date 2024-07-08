export interface UserProfile {
  userProfileId: number;
  user: User;
  gender: string;
  dateOfBirth: string;
  address: string;
  location: string;
  education: Education[];
  keySkills: string[];
  languagesKnown: string[];
  internships: Internship[];
  projects: Project[];
  achievements: string[];
  certifications: string[];
  resumeFilePath: string;
}

export interface User {
  userId: number;
  email: string;
  // Add other properties from your User entity as needed
}

export interface Education {
  level: string; // 10th, Intermediate, B.Tech
  schoolCollegeName: string;
  specialization: string;
  yearOfPassing: string;
  cgpa: number;
}

export interface Internship {
  companyName: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  projectName: string;
  description: string;
  duration: string;
}
