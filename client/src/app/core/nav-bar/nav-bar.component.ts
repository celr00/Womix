import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/landing/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  selectedTheme: string = '';

  constructor(public accountService: AccountService) {}
  ngOnInit(): void {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme')!;
    if (currentTheme === 'auto') {
      // If the current theme is 'auto', set the theme based on the user's system preferences
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    } else {
      // Set the selected theme to the current theme
      this.selectedTheme = currentTheme;
    }
  }

  setTheme(theme: string): void {
    // Set the data-bs-theme attribute of the HTML tag to the specified theme
    document.documentElement.setAttribute('data-bs-theme', theme);
    // Set the selected theme to the specified theme
    this.selectedTheme = theme;
  }
}
