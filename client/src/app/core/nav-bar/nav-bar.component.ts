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
    const storedTheme = localStorage.getItem('theme');
    const currentTheme = document.documentElement.getAttribute('data-bs-theme')!;
    if (storedTheme) {
      this.setTheme(storedTheme);
    } else if (currentTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
    else {
      this.selectedTheme = currentTheme;
    }
  }

  setTheme(theme: string): void {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-bs-theme', theme);
      this.selectedTheme = theme;
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
      this.selectedTheme = theme;
    }
    localStorage.setItem('theme', theme);
  }
}
