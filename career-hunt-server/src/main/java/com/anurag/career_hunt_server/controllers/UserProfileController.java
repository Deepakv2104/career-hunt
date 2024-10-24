package com.anurag.career_hunt_server.controllers;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.anurag.career_hunt_server.model.Job;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.model.UserProfile;
import com.anurag.career_hunt_server.repositories.UserRepository;
import com.anurag.career_hunt_server.services.JobService;
import com.anurag.career_hunt_server.services.StorageService;
import com.anurag.career_hunt_server.services.UserProfileService;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import java.nio.file.Path;
import org.springframework.http.MediaType;


@RestController
@RequestMapping("/userProfile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storageService;
    
    @Autowired
    private JobService jobService;

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
    
    @GetMapping("/allJobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }
    
    
    @GetMapping("/resume")
    public ResponseEntity<Resource> getResume(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email);
            if (user != null) {
                UserProfile userProfile = userProfileService.getUserProfile(user.getUserId());
                if (userProfile.getResumeFilePath() != null) {
                    Path filePath = storageService.getFileLocation(userProfile.getResumeFilePath());
                    Resource resource = new UrlResource(filePath.toUri());

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
                throw new UsernameNotFoundException("User not found with Email: " + email);
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
//    @GetMapping("/resume")
//    public ResponseEntity<Resource> getResume(Authentication authentication) {
//        try {
//            String email = authentication.getName();
//            User user = userRepository.findByEmail(email);
//            if (user != null) {
//                UserProfile userProfile = userProfileService.getUserProfile(user.getUserId());
//                if (userProfile.getResumeFilePath() != null) {
//                    Path filePath = storageService.getFileLocation(userProfile.getResumeFilePath());
//                    Resource resource = new UrlResource(filePath.toUri());
//
//                    if (resource.exists() || resource.isReadable()) {
//                        return ResponseEntity.ok()
//                                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                                .body(resource);
//                    } else {
//                        throw new RuntimeException("Could not read the file!");
//                    }
//                } else {
//                    throw new RuntimeException("Resume not found for user");
//                }
//            } else {
//                throw new UsernameNotFoundException("User not found with Email: " + email);
//            }
//        } catch (UsernameNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
}