package com.anurag.career_hunt_server.services;

import com.anurag.career_hunt_server.enums.Role;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(MyUserDetailsService.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.debug("Loading user by username: {}", email);

        User user = userRepository.findByEmail(email);
        if (user == null) {
            logger.error("User not found with Email: {}", email);
            throw new UsernameNotFoundException("User not found with Email: " + email);
        }

        logger.debug("User found: {}", user.getEmail());

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            Collections.singleton(mapRoleToAuthority(user.getRole()))
        );
    }

    private GrantedAuthority mapRoleToAuthority(Role role) {
        return new SimpleGrantedAuthority(role.name()); // Assuming role.name() gives the role name as a String
    }
}


