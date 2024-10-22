package com.anurag.career_hunt_server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anurag.career_hunt_server.model.Employer;
import com.anurag.career_hunt_server.model.Job;
import com.anurag.career_hunt_server.model.JobApplication;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.repositories.EmployerRepository;
import com.anurag.career_hunt_server.repositories.JobApplicationRepository;
import com.anurag.career_hunt_server.repositories.UserRepository;

@Service
public class EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public Employer createProfile(String email, Employer employer) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            employer.setUser(user);
            user.setEmployer(employer);
            userRepository.save(user);  // This will save both user and employer due to CascadeType.ALL
            return employer;
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    public Employer getProfile(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return user.getEmployer();
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    public Employer updateProfile(String email, Employer updatedEmployer) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            Employer employer = user.getEmployer();
            if (employer != null) {
                employer.setCompanyName(updatedEmployer.getCompanyName());
                employer.setCompanyAddress(updatedEmployer.getCompanyAddress());
                employer.setCompanyWebsite(updatedEmployer.getCompanyWebsite());
                return employerRepository.save(employer);
            } else {
                throw new RuntimeException("Employer profile not found for user with email: " + email);
            }
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    @Transactional
    public void deleteProfile(Long userId) {
        User user = userRepository.findByUserId(userId);
        if (user != null) {
            employerRepository.deleteById(user.getEmployer().getEmpId());
            userRepository.deleteById(userId);
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }
    
    public List<JobApplication> getApplicationsForEmployer(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            Employer employer = user.getEmployer();
            if (employer != null) {
                List<Job> jobs = employer.getJobs();
                List<JobApplication> applications = new ArrayList<>();
                for (Job job : jobs) {
                    applications.addAll(jobApplicationRepository.findByJob(job));
                }
                return applications;
            } else {
                throw new RuntimeException("Employer profile not found for user with email: " + email);
            }
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }
}
