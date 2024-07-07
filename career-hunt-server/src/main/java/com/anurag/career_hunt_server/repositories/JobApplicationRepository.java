package com.anurag.career_hunt_server.repositories;


import com.anurag.career_hunt_server.model.Job;
import com.anurag.career_hunt_server.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
    List<JobApplication> findByJob(Job job);
    List<JobApplication> findByJobIn(List<Job> jobs);  // Find by a list of Job entities
}
