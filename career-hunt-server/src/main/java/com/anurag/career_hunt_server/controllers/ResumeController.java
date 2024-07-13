package com.anurag.career_hunt_server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.model.UserProfile;
import com.anurag.career_hunt_server.repositories.UserRepository;
import com.anurag.career_hunt_server.services.StorageService;
import com.anurag.career_hunt_server.services.UserProfileService;

import java.nio.file.Path;

@RestController
@RequestMapping("/resume")
public class ResumeController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storageService;

    @GetMapping("/view/{userId}")
    public ResponseEntity<Resource> viewResume(@PathVariable Long userId) {
        try {
        	// Retrieve the user by user ID
            User user = userRepository.findByUserId(userId);
            if (user != null) {
            	// Retrieve the user's profile
                UserProfile userProfile = userProfileService.getUserProfile(userId);
                if (userProfile.getResumeFilePath() != null) {
                	// Get the file location of the resume
                    Path filePath = storageService.getFileLocation(userProfile.getResumeFilePath());
                    Resource resource = new UrlResource(filePath.toUri());
                 // Check if the file exists and is readable
                    if (resource.exists() || resource.isReadable()) {
                        String contentType = "application/pdf";
                        return ResponseEntity.ok()
                                .contentType(MediaType.parseMediaType(contentType))
                                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                                .body(resource);
                    } else {
                        throw new RuntimeException("Could not read the file!");
                    }
                } else {
                    throw new RuntimeException("Resume not found for user");
                }
            } else {
                throw new UsernameNotFoundException("User not found with ID: " + userId);
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/viewResume/{resumeFilePath}")
    public ResponseEntity<Resource> viewResume(@PathVariable String resumeFilePath) {
        try {
        	// Load the file as a Resource
            Resource resource = storageService.loadFileAsResource(resumeFilePath);
         // Check if the file exists and is readable
            if (resource.exists() || resource.isReadable()) {
                String contentType = "application/pdf";
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
