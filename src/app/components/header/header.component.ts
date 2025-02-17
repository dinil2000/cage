import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDarkMode = false;
  isLoggedIn = false; // Track login state

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // 🔹 Listen for login state changes
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    // 🔹 Check if dark mode was previously enabled
    if (localStorage.getItem('dark-mode') === 'enabled') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');

    // Save user preference
    if (this.isDarkMode) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false; // Update state
    this.router.navigate(['/login']); // Redirect to login page
  }
}
