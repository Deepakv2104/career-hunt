import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      this.isDarkMode ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark');
    }
  }
}
