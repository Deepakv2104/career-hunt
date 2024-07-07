package com.anurag.career_hunt_server.services;

import com.anurag.career_hunt_server.model.Employer;
import com.anurag.career_hunt_server.model.Job;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.repositories.EmployerRepository;
import com.anurag.career_hunt_server.repositories.JobRepository;
import com.anurag.career_hunt_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private UserRepository userRepository;

    public Job postJob(String email, Job job) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            Employer employer = user.getEmployer();
            if (employer != null) {
                job.setEmployer(employer);
                job.setCompanyName(employer.getCompanyName());
                return jobRepository.save(job);
            } else {
                throw new RuntimeException("Employer profile not found for user with email: " + email);
            }
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    public Job updateJob(Long jobId, Job updatedJob) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));
        job.setRole(updatedJob.getRole());
        job.setJobDescription(updatedJob.getJobDescription());
        job.setType(updatedJob.getType());
        job.setEligibility(updatedJob.getEligibility());
        job.setExperience(updatedJob.getExperience());
        job.setSalary(updatedJob.getSalary());
        job.setLocation(updatedJob.getLocation());
        return jobRepository.save(job);
    }

    public void deleteJob(Long jobId) {
        jobRepository.deleteById(jobId);
    }

    public List<Job> getJobs(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            Employer employer = user.getEmployer();
            if (employer != null) {
                return employer.getJobs();
            } else {
                throw new RuntimeException("Employer profile not found for user with email: " + email);
            }
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }
    
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
}

