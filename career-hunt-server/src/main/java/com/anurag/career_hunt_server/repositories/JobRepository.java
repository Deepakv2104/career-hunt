package com.anurag.career_hunt_server.repositories;

import com.anurag.career_hunt_server.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}

