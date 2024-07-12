import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.css']
})
export class ReplyDialogComponent {
  replyText: string = '';
  isDarkMode: boolean = false; // Variable to track dark mode

  constructor(
    public dialogRef: MatDialogRef<ReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string, feedbackText: string }
  ) {}

  onSend(): void {
    // Logic to send reply (e.g., call a service)
    this.dialogRef.close(this.replyText);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
