package com.anurag.career_hunt_server.services;

import com.anurag.career_hunt_server.model.Employer;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.repositories.EmployerRepository;
import com.anurag.career_hunt_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private UserRepository userRepository;

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
}

