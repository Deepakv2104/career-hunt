package com.anurag.career_hunt_server.repositories;
import com.anurag.career_hunt_server.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long>  {

}
