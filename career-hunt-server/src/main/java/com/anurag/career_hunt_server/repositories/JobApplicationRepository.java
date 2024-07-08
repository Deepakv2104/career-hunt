package com.anurag.career_hunt_server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anurag.career_hunt_server.model.Job;
import com.anurag.career_hunt_server.model.JobApplication;
import com.anurag.career_hunt_server.model.User;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
    List<JobApplication> findByJob(Job job);
    List<JobApplication> findByJobIn(List<Job> jobs);  // Find by a list of Job entities
    List<JobApplication> findByUser(User user);
}
