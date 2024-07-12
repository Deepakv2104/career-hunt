import { Employer } from "./job-application.model";

export interface Job {
    jobId?: number;
    role: string;
    jobDescription: string;
    type: string; // Full/Internship
    eligibility: string;
    experience: number; // years
    salary: number; // annual salary
    location: string;
    responsibility: string;
    requirements: string;
    dateofPosting:Date;
    lastDateToApply:Date;
    employer: Employer
   empId: string;
   companyName: string;
   companyWebsite:string;
  }
  