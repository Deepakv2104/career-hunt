package com.anurag.career_hunt_server.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Feedback {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne
	    @JoinColumn(name = "userId")
	    private User user;

	    private String feedbackText;

}
