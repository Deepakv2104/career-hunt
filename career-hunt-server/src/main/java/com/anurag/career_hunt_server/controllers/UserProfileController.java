package com.anurag.career_hunt_server.controllers;



import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.model.UserProfile;
import com.anurag.career_hunt_server.repositories.UserRepository;
import com.anurag.career_hunt_server.services.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/userProfile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/createProfile")
    public UserProfile createProfile(Authentication authentication, @RequestBody UserProfile userProfile) {
        String email = authentication.getName();
        return userProfileService.createProfile(email, userProfile);
    }

    @GetMapping("/getProfile")
    public UserProfile getProfile(Authentication authentication) {
        String email = authentication.getName();
        return userProfileService.getProfile(email);
    }

    @PutMapping("/updateProfile")
    public UserProfile updateProfile(Authentication authentication, @RequestBody UserProfile userProfile) {
        String email = authentication.getName();
        return userProfileService.updateProfile(email, userProfile);
    }

    @DeleteMapping("/deleteProfile")
    public void deleteProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email);
        if (user != null) {
            userProfileService.deleteProfile(user.getUserId());
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

}
