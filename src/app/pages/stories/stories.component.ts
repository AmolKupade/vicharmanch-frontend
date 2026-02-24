import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service'; // पाथ चेक कर

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss'
})
export class StoriesComponent implements OnInit {
  
  allPosts: any[] = []; // Original Data from Backend
  displayPosts: any[] = []; // Filtered Data
  featuredPost: any = null; // Big Hero Post
  
  // आपल्या डेटाबेसमध्ये असलेल्या खऱ्या कॅटेगरीज
  categories = ['All', 'Technology', 'Startups', 'Lifestyle', 'Design', 'Culture'];
  activeCategory = signal('All');
  visibleCount = signal(6); // Load More साठी
  loading = signal(true); // डेटा येईपर्यंत लोडिंग

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchStories();
  }

  fetchStories() {
    this.loading.set(true);
    // 'Explore' API मधून सर्व आर्टिकल्स आणणे (कारण त्यात सर्व लेटेस्ट आर्टिकल्स असतात)
    this.dataService.getHomeData().subscribe({
      next: (res: any) => {
        // डेटाबेसच्या डेटाला UI च्या फॉरमॅटमध्ये मॅप करणे
        const mappedPosts = res.data.latestArticles.map((p: any) => ({
          id: p.id || p._id, // MongoDB चा ID
          title: p.title,
          excerpt: p.excerpt || p.desc,
          tag: p.tag,
          readTime: p.readTime,
          author: p.author,
          date: p.date,
          image: p.image || p.coverClass || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'
        }));

        this.allPosts = mappedPosts; // सर्व डेटा सेव्ह करणे
        this.filterPosts('All'); // डिफॉल्ट 'All' कॅटेगरी दाखवणे
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Error loading stories:', err);
        this.loading.set(false);
      }
    });
  }

  // कॅटेगरी टॅबवर क्लिक केल्यावर
  filterPosts(category: string) {
    this.activeCategory.set(category);
    this.visibleCount.set(6); // Load more रिसेट करणे

    // 1. Filter Logic (लोकल फिल्टरिंग, जेणेकरून टॅब एकदम फास्ट चेंज होतील)
    let filtered = category === 'All' 
      ? this.allPosts 
      : this.allPosts.filter(p => p.tag.toLowerCase() === category.toLowerCase());

    // 2. Set Hero Post (फिल्टर केलेल्या लिस्टमधून पहिला आर्टिकल)
    if (filtered.length > 0) {
      this.featuredPost = filtered[0];
      this.displayPosts = filtered.slice(1); // उरलेले आर्टिकल्स ग्रिड मध्ये
    } else {
      this.featuredPost = null;
      this.displayPosts = [];
    }
  }

  loadMore() {
    this.visibleCount.update(c => c + 3); // ३-३ ने नवीन आर्टिकल्स लोड करणे
  }

  // HTML मध्ये दाखवण्यासाठी Computed Array
  get visiblePosts() {
    return this.displayPosts.slice(0, this.visibleCount());
  }
}