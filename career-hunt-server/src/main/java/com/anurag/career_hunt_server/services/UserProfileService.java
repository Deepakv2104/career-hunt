package com.anurag.career_hunt_server.services;



import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.model.UserProfile;
import com.anurag.career_hunt_server.repositories.UserProfileRepository;
import com.anurag.career_hunt_server.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public UserProfile createProfile(String email, UserProfile userProfile) {
        User user = userRepository.findByEmail(email);
        userProfile.setUser(user);
        return userProfileRepository.save(userProfile);
    }

    public UserProfile getProfile(String email) {
        User user = userRepository.findByEmail(email);
        return userProfileRepository.findByUser(user);
    }

    public UserProfile updateProfile(String email, UserProfile userProfile) {
        User user = userRepository.findByEmail(email);
        UserProfile existingUserProfile = userProfileRepository.findByUser(user);
        if (existingUserProfile == null) {
            throw new RuntimeException("User profile not found");
        }
        userProfile.setUserProfileId(existingUserProfile.getUserProfileId()); // Keep the same ID
        userProfile.setUser(user); // Keep the same user
        return userProfileRepository.save(userProfile);
    }

    public void deleteProfile(Long userId) {
        userProfileRepository.deleteById(userId);
    }
}
