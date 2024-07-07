package com.anurag.career_hunt_server.security;

import com.anurag.career_hunt_server.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {

    private String token;
    private String email; // Add username field
    private Role role;
    private Long userId;
    private String username;

    // Constructor without username for compatibility
    public JwtResponse(String token) {
        this.token = token;
    }
}
