import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  
 isDarkMode = signal(false);
  isPaused = signal(false); 
  isLoading = signal(true); // डेटा लोड होईपर्यंत स्पिनरसाठी (optional)
  
  // Dynamic Data (आता सगळं API मधून येईल)
  slides: any[] = [];
  categories: any[] = [];
  featuredBlog: any = null;
  latestArticles: any[] = [];
  collections: any[] = [];
  topWriters: any[] = [];
  trendingTopics: string[] = [];

  currentSlide = signal(0);
  private intervalId: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.checkTheme();
    this.fetchDataFromBackend(); // 👈 नवीन फंक्शन
  }

  fetchDataFromBackend() {
    this.dataService.getHomeData().subscribe({
      next: (response) => {
        const data = response.data;
        
        // बॅकएंडचा डेटा UI च्या व्हेरिएबल्सला जोडणे
        this.slides = data.slides;
        this.categories = data.categories;
        this.featuredBlog = data.featuredBlog;
        this.latestArticles = data.latestArticles;
        this.collections = data.collections;
        this.topWriters = data.topWriters;
        this.trendingTopics = data.trendingTopics;

        this.isLoading.set(false);
        this.startAutoSlide(); // डेटा आल्यावरच स्लाइडर सुरु करा
        console.log('🔥 Home Page Data Loaded from MongoDB!', data);
      },
      error: (error) => {
        console.error('❌ Error fetching home data:', error);
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startAutoSlide() {
    if (this.slides.length > 0) {
      this.intervalId = setInterval(() => {
        this.currentSlide.update(val => (val + 1) % this.slides.length);
      }, 6000);
    }
  }

  // Animation Control
  pauseAnimation() {
    this.isPaused.set(true);
  }

  resumeAnimation() {
    this.isPaused.set(false);
  }

  // Theme Logic
  checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      this.setDark(true);
    } else {
      this.setDark(false);
    }
  }

  toggleTheme() {
    this.setDark(!this.isDarkMode());
  }

  setDark(isDark: boolean) {
    this.isDarkMode.set(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}