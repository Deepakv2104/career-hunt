import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'career-hunt-client';
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      this.isDarkMode ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark');
    }
  }
}
