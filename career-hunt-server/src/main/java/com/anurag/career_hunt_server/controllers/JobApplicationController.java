package com.anurag.career_hunt_server.controllers;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.anurag.career_hunt_server.model.JobApplication;
import com.anurag.career_hunt_server.services.JobApplicationService;
import com.anurag.career_hunt_server.services.EmployerService;

@RestController
@RequestMapping("/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;
    
    @Autowired
    private EmployerService employerService;

    @PostMapping("/apply/{jobId}")
    public JobApplication applyForJob(Authentication authentication, @PathVariable Long jobId) {
        String email = authentication.getName();
        return jobApplicationService.applyForJob(email, jobId);
    }

    @GetMapping("/job/{jobId}")
    public List<JobApplication> getApplicationsForJob(Authentication authentication, @PathVariable Long jobId) {
        String email = authentication.getName();
        return jobApplicationService.getApplicationsForJob(email, jobId);
    }

    @GetMapping("/allApplications")
    public List<JobApplication> getApplicationsForEmployer(Authentication authentication) {
        String email = authentication.getName();
        return employerService.getApplicationsForEmployer(email);
    }

    @GetMapping("/myApplications")
    public List<JobApplication> getApplicationsForUser(Authentication authentication) {
        String email = authentication.getName();
        return jobApplicationService.getApplicationsForUser(email);
    }

    @PutMapping("/updateStatus/{applicationId}/{status}")
    public JobApplication updateApplicationStatus(Authentication authentication, @PathVariable Long applicationId, @PathVariable String status) {
       // return jobApplicationService.updateApplicationStatus(applicationId, status);
        String email = authentication.getName();
        return jobApplicationService.updateApplicationStatus(email, applicationId,status);
    }
}