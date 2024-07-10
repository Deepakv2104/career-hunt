package com.anurag.career_hunt_server.repositories;

import com.anurag.career_hunt_server.enums.Role;
import com.anurag.career_hunt_server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    User findByUserId(Long userId);
   
}
