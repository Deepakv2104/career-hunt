package com.anurag.career_hunt_server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    private String role;
    private String jobDescription;
    private String type; // Full/Internship
    private String eligibility;
    private int experience; // years
    private double salary; // annual salary
    private String location;

    @ManyToOne
    @JoinColumn(name = "empId")
    @JsonIgnoreProperties("jobs")
    private Employer employer;

    
    private String companyName; // This will be set from the employer's company name
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}

