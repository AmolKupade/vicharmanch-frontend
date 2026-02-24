import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isDarkMode = signal(false);
  isMobileMenuOpen = signal(false);
  isScrolled = signal(false); // 🔥 New: स्क्रोल डिटेक्ट करण्यासाठी

  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Links Array
  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Stories', path: '/stories' }, // Example link
    { label: 'Explore', path: '/explore' }, // Example link
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  ngOnInit() {
    this.checkTheme();
    this.authService.currentUserSubject.subscribe(userData => {
      this.user = userData;
    });
  }

  // 🔥 जेव्हा युजर स्क्रोल करेल तेव्हा हे फायर होईल
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20); // 20px पेक्षा जास्त स्क्रोल झाल्यावर True होईल
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  checkTheme() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && systemDark)) this.setDark(true);
    }
  }

  toggleTheme() { this.setDark(!this.isDarkMode()); }

  setDark(isDark: boolean) {
    this.isDarkMode.set(isDark);
    const html = document.documentElement;
    isDark ? html.classList.add('dark') : html.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']); // लॉगआउट झाल्यावर होम पेजवर पाठवा
  }
}