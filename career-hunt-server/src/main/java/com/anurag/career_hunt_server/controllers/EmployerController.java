package com.anurag.career_hunt_server.controllers;

import com.anurag.career_hunt_server.model.Employer;
import com.anurag.career_hunt_server.services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employer")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @PostMapping("/createProfile")
    public Employer createProfile(Authentication authentication, @RequestBody Employer employer) {
        String email = authentication.getName();
        return employerService.createProfile(email, employer);
    }
}

