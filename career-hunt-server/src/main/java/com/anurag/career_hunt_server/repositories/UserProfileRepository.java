package com.anurag.career_hunt_server.repositories;

import com.anurag.career_hunt_server.model.UserProfile;
import com.anurag.career_hunt_server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    UserProfile findByUser(User user);
}