package com.anurag.career_hunt_server.controllers;


import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.model.UserProfile;
import com.anurag.career_hunt_server.repositories.UserRepository;
import com.anurag.career_hunt_server.services.UserProfileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.anurag.career_hunt_server.services.StorageService;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RestController
@RequestMapping("/userProfile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storageService;

    @PostMapping("/createProfile")
    public UserProfile createProfile(Authentication authentication, 
                                     @RequestPart("profile") String profileData, 
                                     @RequestPart("resume") MultipartFile resume) throws IOException {
        String email = authentication.getName();
        UserProfile userProfile = new ObjectMapper().readValue(profileData, UserProfile.class);
        return userProfileService.createProfile(email, userProfile, resume);
    }

    @GetMapping("/getProfile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email);
            if (user != null) {
                UserProfile userProfile = userProfileService.getUserProfile(user.getUserId());
                return ResponseEntity.ok(userProfile);
            } else {
                throw new UsernameNotFoundException("User not found with Email: " + email);
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/updateProfile")
    public UserProfile updateProfile(Authentication authentication, 
                                     @RequestPart("profile") String profileData, 
                                     @RequestPart("resume") MultipartFile resume) throws IOException {
        String email = authentication.getName();
        UserProfile userProfile = new ObjectMapper().readValue(profileData, UserProfile.class);
        return userProfileService.updateProfile(email, userProfile, resume);
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