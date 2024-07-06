package com.anurag.career_hunt_server.services;





import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.model.UserProfile;
import com.anurag.career_hunt_server.repositories.UserProfileRepository;
import com.anurag.career_hunt_server.repositories.UserRepository;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StorageService storageService;

    public UserProfile createProfile(String email, UserProfile userProfile, MultipartFile resume) throws IOException {
        User user = userRepository.findByEmail(email);
        userProfile.setUser(user);
        if (resume != null && !resume.isEmpty()) {
            String resumeFileName = storageService.storeFile(resume);
            userProfile.setResumeFilePath(resumeFileName);
        }
        return userProfileRepository.save(userProfile);
    }

    public UserProfile getUserProfile(Long userId) {
        User user = userRepository.findByUserId(userId);
        if (user != null) {
            UserProfile userProfile = userProfileRepository.findByUser(user);
            if (userProfile != null) {
                return userProfile;
            } else {
                throw new UsernameNotFoundException("UserProfile not found for User ID: " + userId);
            }
        } else {
            throw new UsernameNotFoundException("User not found with ID: " + userId);
        }
    }

    public UserProfile updateProfile(String email, UserProfile userProfile, MultipartFile resume) throws IOException {
        User user = userRepository.findByEmail(email);
        UserProfile existingUserProfile = userProfileRepository.findByUser(user);
        if (existingUserProfile == null) {
            throw new RuntimeException("User profile not found");
        }
        userProfile.setUserProfileId(existingUserProfile.getUserProfileId()); // Keep the same ID
        userProfile.setUser(user); // Keep the same user
        if (resume != null && !resume.isEmpty()) {
            String resumeFileName = storageService.storeFile(resume);
            userProfile.setResumeFilePath(resumeFileName);
        }
        return userProfileRepository.save(userProfile);
    }

    @Transactional
    public void deleteProfile(Long userId) {
        User user = userRepository.findByUserId(userId);
        if (user != null) {
            UserProfile userProfile = userProfileRepository.findByUser(user);
            if (userProfile != null) {
                userProfileRepository.deleteById(userProfile.getUserProfileId());
            }
            userRepository.deleteById(userId);
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }
}