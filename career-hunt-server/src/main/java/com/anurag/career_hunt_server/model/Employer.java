package com.anurag.career_hunt_server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String companyAddress;
    private String companyWebsite;

    @OneToOne
    @JoinColumn(name = "userId")
    @JsonIgnoreProperties("employer")
    private User user;
}
