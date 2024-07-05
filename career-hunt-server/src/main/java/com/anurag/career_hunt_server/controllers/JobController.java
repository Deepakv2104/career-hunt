package com.anurag.career_hunt_server.controllers;

import com.anurag.career_hunt_server.model.Job;
import com.anurag.career_hunt_server.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employer/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/postJob")
    public Job postJob(Authentication authentication, @RequestBody Job job) {
        String email = authentication.getName();
        return jobService.postJob(email, job);
    }

    @PutMapping("/updateJob/{jobId}")
    public Job updateJob(@PathVariable Long jobId, @RequestBody Job job) {
        return jobService.updateJob(jobId, job);
    }

    @DeleteMapping("/deleteJob/{jobId}")
    public void deleteJob(@PathVariable Long jobId) {
        jobService.deleteJob(jobId);
    }

    @GetMapping("/getJobs")
    public List<Job> getJobs(Authentication authentication) {
        String email = authentication.getName();
        return jobService.getJobs(email);
    }
}

