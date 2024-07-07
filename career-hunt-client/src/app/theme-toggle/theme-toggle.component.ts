import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent implements OnInit {

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    // The theme service will automatically load the theme
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
