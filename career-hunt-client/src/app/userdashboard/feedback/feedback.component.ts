import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { Feedback } from 'src/app/model/feedback.model';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedbackText: string = '';

  constructor(
    public dialogRef: MatDialogRef<FeedbackComponent>,
    private feedbackService: FeedbackService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submitFeedback() {
    const feedback: Feedback = { feedbackText: this.feedbackText };
    this.feedbackService.postFeedback(feedback).subscribe(
      (response) => {
        console.log('Feedback submitted successfully:', response);
        alert('Thank you for your feedback!');
        this.feedbackText = '';
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error submitting feedback:', error);
        alert('There was an error submitting your feedback. Please try again.');
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
