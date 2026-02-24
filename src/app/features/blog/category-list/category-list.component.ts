import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  categoryName = signal('');
  posts = signal<any[]>([]);
  loading = signal(true);

  // 🔥 Derived State (पहिली पोस्ट 'Featured' मध्ये आणि बाकीच्या ग्रिड मध्ये)
  featuredPost = computed(() => this.posts().length > 0 ? this.posts()[0] : null);
  gridPosts = computed(() => this.posts().length > 1 ? this.posts().slice(1) : []);
  
  // Fake Top Writers (Rich Content साठी)
  topWriters = [
    { name: 'Dr. Siddharth', role: 'AI Researcher', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth' },
    { name: 'Aditi Sharma', role: 'Lifestyle', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditi' },
    { name: 'Vikram Joshi', role: 'Tech Lead', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' }
  ];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // राऊटिंगनुसार पॅरामीटरचं नाव 'name' किंवा 'category' असू शकतं
      const cat = params.get('name') || params.get('category');
      if (cat) {
        this.categoryName.set(cat);
        this.fetchPosts(cat);
      }
    });
  }

  fetchPosts(category: string) {
    this.loading.set(true);
    
    // 🚀 थेट बॅकएंडवरून कॅटेगरीनुसार डेटा आणणे
    this.dataService.getArticlesByCategory(category).subscribe({
      next: (res: any) => {
        // MongoDB चा डेटा UI च्या फॉरमॅटमध्ये सेट करणे
        const mappedPosts = res.data.map((p: any) => ({
          id: p._id,
          title: p.title,
          excerpt: p.desc,
          tag: p.tag,
          readTime: p.readTime, 
          author: p.author,
          date: p.date,
          image: p.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000'
        }));

        this.posts.set(mappedPosts);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Error fetching category data:', err);
        this.loading.set(false);
      }
    });
  }
}