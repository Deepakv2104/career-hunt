package com.anurag.career_hunt_server.repositories;

import com.anurag.career_hunt_server.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
}

