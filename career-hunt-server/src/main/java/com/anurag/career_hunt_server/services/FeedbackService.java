package com.anurag.career_hunt_server.services;


import com.anurag.career_hunt_server.model.Feedback;
import com.anurag.career_hunt_server.model.User;
import com.anurag.career_hunt_server.repositories.FeedbackRepository;
import com.anurag.career_hunt_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Feedback postFeedback(String email, Feedback feedback) {
        
        User user = userRepository.findByEmail(email);

        // Set the user in the feedback object
        feedback.setUser(user);

        // Save the feedback object
       return feedbackRepository.save(feedback);

        
    }
}


