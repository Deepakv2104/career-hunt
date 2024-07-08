package com.anurag.career_hunt_server.model;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @ManyToOne
    @JoinColumn(name = "jobId", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "userProfileId", nullable = false)
    private UserProfile userProfile;

    private Date applicationDate;
}


