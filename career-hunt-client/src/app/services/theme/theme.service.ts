import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = false;

  constructor() {
    this.loadTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.saveTheme();
    this.updateHtmlClass();
  }

  private loadTheme() {
    const storedTheme = localStorage.getItem('isDarkMode');
    if (storedTheme) {
      this.isDarkMode = JSON.parse(storedTheme);
    }
    this.updateHtmlClass();
  }

  private saveTheme() {
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  private updateHtmlClass() {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      this.isDarkMode ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark');
    }
  }
}
