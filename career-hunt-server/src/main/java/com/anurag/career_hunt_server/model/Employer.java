package com.anurag.career_hunt_server.model;

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
    @JoinColumn(name = "user_id")
    private User user;
}
