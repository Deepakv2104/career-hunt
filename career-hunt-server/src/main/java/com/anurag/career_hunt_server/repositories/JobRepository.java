package com.anurag.career_hunt_server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anurag.career_hunt_server.model.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
	List<Job> findAll();
}

