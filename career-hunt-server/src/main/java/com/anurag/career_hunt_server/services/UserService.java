package com.anurag.career_hunt_server.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.anurag.career_hunt_server.enums.Role;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

	public boolean existsByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.existsByEmail(email);
	}
	
	 public Role getRoleByEmail(String email) {
	      User user = userRepository.findByEmail(email);
	      return (user != null) ? user.getRole() : null;
	 }

	public Long getByUserId(String email) {
		// TODO Auto-generated method stub
		User user = userRepository.findByEmail(email);
	    return (user != null) ? user.getUserId() : null;
	}

	public String getUsername(String email) {
		// TODO Auto-generated method stub
		User user = userRepository.findByEmail(email);
	    return (user != null) ? user.getUsername() : null;
	}
}


