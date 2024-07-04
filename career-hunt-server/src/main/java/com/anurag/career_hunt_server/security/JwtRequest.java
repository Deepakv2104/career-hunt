package com.anurag.career_hunt_server.security;

import com.anurag.career_hunt_server.security.JwtRequest;
import lombok.Data;

@Data
public class JwtRequest {

    private String email;
    private String password;

}