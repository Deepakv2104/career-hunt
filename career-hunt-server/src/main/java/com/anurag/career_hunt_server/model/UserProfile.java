package com.anurag.career_hunt_server.model;



import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userProfileId;

    @OneToOne
    @JoinColumn(name = "userId", unique = true)
    private User user;

    private String gender;
    private String dateOfBirth;
    private String address;
    private String location;

    @ElementCollection
    private List<Education> education;

    @ElementCollection
    private List<String> keySkills;

    @ElementCollection
    private List<String> languagesKnown;

    @ElementCollection
    private List<Internship> internships;

    @ElementCollection
    private List<Project> projects;

    @ElementCollection
    private List<String> achievements;

    @ElementCollection
    private List<String> certifications;

    

    @Embeddable
    @Data
    public static class Education {
        private String level; // 10th, Intermediate, B.Tech
        private String schoolCollegeName;
        private String specialization;
        private String yearOfPassing;
        private double cgpa;
    }

    @Embeddable
    @Data
    public static class Internship {
        private String companyName;
        private String role;
        private String duration;
        private String description;
    }

    @Embeddable
    @Data
    public static class Project {
        private String projectName;
        private String description;
        private String duration;
    }
}
