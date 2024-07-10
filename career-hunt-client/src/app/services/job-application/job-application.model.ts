// job-application.model.ts
export interface JobApplication {
    applicationId: number;
    job: Job;
    user: User;
    userProfile: UserProfile;
    applicationDate: Date;
    status: string;
  }
  
  export interface Job {
    jobId: number;
    role: string;
    jobDescription: string;
    type: string;
    eligibility: string;
    experience: number;
    salary: number;
    location: string;
    responsibility: string;
    requirements: string;
    dateofPosting: Date;
    lastDateToApply: Date;
    employer: Employer;
    companyName: string; // Ensure this matches your backend response structure
  }
  
  export interface Employer {
    empId: number;
    companyName: string;
    companyDescription: string | null;
    companyAddress: string;
    companyWebsite: string;
    user: User;
  }
  
  export interface User {
    userId: number;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    role: string;
  }
  
  export interface UserProfile {
    userProfileId: number;
    user: User;
    gender: string;
    dateOfBirth: Date;
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
  
  export interface Education {
    level: string;
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
  