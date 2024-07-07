package com.anurag.career_hunt_server.controllers;

import com.anurag.career_hunt_server.enums.Role;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.security.JwtRequest;
import com.anurag.career_hunt_server.security.JwtResponse;
import com.anurag.career_hunt_server.security.JwtTokenProvider;
import com.anurag.career_hunt_server.services.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")	
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        if (userService.existsByEmail(user.getEmail())) {
            response.put("message", "Username already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        User savedUser = userService.save(user);
        response.put("message", "User registered successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody JwtRequest authenticationRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                            authenticationRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtToken = jwtTokenProvider.generateToken(userDetails);
            String email = userDetails.getUsername();
            Role role = userService.getRoleByEmail(email); // Assuming you have a method to fetch user's role
            Long userId = userService.getByUserId(email);
            String username = userService.getUsername(email);
            return ResponseEntity.ok(new JwtResponse(jwtToken,email,role,userId,username));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
