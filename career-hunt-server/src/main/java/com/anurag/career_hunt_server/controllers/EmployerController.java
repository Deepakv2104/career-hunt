package com.anurag.career_hunt_server.controllers;

import com.anurag.career_hunt_server.model.Employer;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.repositories.UserRepository;
import com.anurag.career_hunt_server.services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employer")
public class EmployerController {

    @Autowired
    private EmployerService employerService;
    @Autowired
    private UserRepository userRepository; 

    @PostMapping("/createProfile")
    public Employer createProfile(Authentication authentication, @RequestBody Employer employer) {
        String email = authentication.getName();
        return employerService.createProfile(email, employer);
    }
    
    @GetMapping("/getProfile")
    public Employer getProfile(Authentication authentication) {
        String email = authentication.getName();
        return employerService.getProfile(email);
    }
    
    @PutMapping("/updateProfile")
    public Employer updateProfile(Authentication authentication, @RequestBody Employer employer) {
        String email = authentication.getName();
        return employerService.updateProfile(email, employer);
    }

    @DeleteMapping("/deleteProfile")
    public void deleteProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email);
        if (user != null) {
            employerService.deleteProfile(user.getUserId());
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

}

