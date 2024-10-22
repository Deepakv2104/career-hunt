package com.anurag.career_hunt_server.controllers;

import com.anurag.career_hunt_server.model.Feedback;
import com.anurag.career_hunt_server.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/post")
    public Feedback postFeedback(Authentication authentication, @RequestBody Feedback feedback) {
        String email = authentication.getName();
        return feedbackService.postFeedback(email, feedback);
    }
}
