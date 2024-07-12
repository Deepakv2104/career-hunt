import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Feedback } from 'src/app/model/feedback.model';
import { MatDialog } from '@angular/material/dialog';
import { ReplyDialogComponent } from '../reply-dialog/reply-dialog/reply-dialog.component';
@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.adminService.getAllFeedback().subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error fetching feedbacks', error);
      }
    );
  }

  readFeedback(id?: number): void {
    if (id !== undefined) {
      const feedback = this.feedbacks.find(f => f.id === id);
      if (feedback) {
        alert(`Feedback from ${feedback.user?.email}: ${feedback.feedbackText}`);
      } else {
        console.error('Feedback not found');
      }
    } else {
      console.error('Invalid feedback ID');
    }
  }

  replyToFeedback(id?: number): void {
    if (id !== undefined) {
      const feedback = this.feedbacks.find(f => f.id === id);
      if (feedback) {
        const dialogRef = this.dialog.open(ReplyDialogComponent, {
          width: '400px',
          data: { email: feedback.user?.email, feedbackText: feedback.feedbackText }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Reply sent:', result);
          }
        });
      } else {
        console.error('Feedback not found');
      }
    } else {
      console.error('Invalid feedback ID');
    }
  }
}
