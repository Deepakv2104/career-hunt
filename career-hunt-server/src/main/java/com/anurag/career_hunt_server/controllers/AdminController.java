package com.anurag.career_hunt_server.controllers;
import com.anurag.career_hunt_server.model.*;
import com.anurag.career_hunt_server.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/allUserProfiles")
    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    @GetMapping("/allEmployers")
    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    @GetMapping("/allJobs")
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @GetMapping("/allJobApplications")
    public List<JobApplication> getAllJobApplications() {
        return jobApplicationRepository.findAll();
    }

    
    @GetMapping("/allFeedbacks")
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
