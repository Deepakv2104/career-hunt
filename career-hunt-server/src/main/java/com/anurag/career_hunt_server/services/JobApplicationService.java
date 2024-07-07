package com.anurag.career_hunt_server.services;


import com.anurag.career_hunt_server.model.Employer;
import com.anurag.career_hunt_server.model.Job;
import com.anurag.career_hunt_server.model.JobApplication;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.model.UserProfile;
import com.anurag.career_hunt_server.repositories.JobApplicationRepository;
import com.anurag.career_hunt_server.repositories.JobRepository;
import com.anurag.career_hunt_server.repositories.UserRepository;
import com.anurag.career_hunt_server.repositories.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    public JobApplication applyForJob(String email, Long jobId) {
        User user = userRepository.findByEmail(email);
        UserProfile userProfile = user.getUserProfile(userProfileRepository);  // Fetch the userProfile
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));

        JobApplication jobApplication = new JobApplication();
        jobApplication.setJob(job);
        jobApplication.setUser(user);
        jobApplication.setUserProfile(userProfile);
        jobApplication.setApplicationDate(new Date());

        return jobApplicationRepository.save(jobApplication);
    }

    public List<JobApplication> getApplicationsForJob(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));
        return jobApplicationRepository.findByJob(job);
    }

    public List<JobApplication> getApplicationsForEmployer(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }

        Employer employer = user.getEmployer();
        if (employer == null) {
            throw new RuntimeException("Employer profile not found for user with email: " + email);
        }

        List<Job> jobs = employer.getJobs();
        return jobApplicationRepository.findByJobIn(jobs);
    }
}

