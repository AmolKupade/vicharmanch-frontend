import { Component, OnInit, signal, HostListener, effect, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {
 isLoading = signal(true);
  blog: any = null;

  // Interactive Signals
  readingProgress = signal(0);
  claps = signal(0);
  
  // Audio Player Signals
  isPlaying = signal(false);
  progress = signal(0);
  playbackSpeed = signal(1);

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // URL मधून Article चा ID घेणे
    this.route.paramMap.subscribe(params => {
      const articleId = params.get('id');
      if (articleId) {
        this.fetchArticle(articleId);
      }
    });
  }

fetchArticle(id: string) {
  this.dataService.getArticleById(id).subscribe({
    next: (response) => {
      const data = response.data;
      
      this.blog = {
        id: data._id,
        title: data.title,
        subtitle: data.desc,
        tag: data.tag,
        readTime: data.readTime,
        author: data.author,
        authorRole: 'Creator',
        authorImg: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.author}`,
        date: data.date,
        
        // ❌ इथे चुकून 'https://picsum...' अशी फिक्स लिंक असेल तर ती काढून टाक
        // ✅ बॅकएंडवरून येणारी युनिक इमेज लिंक वापरा:
        image: data.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643', 
        
        content: data.content
      };
      
      this.claps.set(parseInt(data.likes) || 0);
      this.isLoading.set(false);
    },
    error: (err) => {
      console.error('Error:', err);
      this.isLoading.set(false);
    }
  });
}

  // --- Scroll Reading Progress ---
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollOffset = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollOffset / windowHeight) * 100;
      this.readingProgress.set(progress);
    }
  }

  // --- Claps Logic ---
  addClap() {
    this.claps.update(c => c + 1);
    // इथे तू Backend ला API कॉल करून Likes वाढवू शकतोस (Optional)
  }

  // --- Audio Player Simulation ---
  togglePlay() {
    this.isPlaying.set(!this.isPlaying());
    if (this.isPlaying()) {
      this.simulateAudioProgress();
    }
  }

  private audioInterval: any;
  simulateAudioProgress() {
    if (this.audioInterval) clearInterval(this.audioInterval);
    this.audioInterval = setInterval(() => {
      if (this.isPlaying() && this.progress() < 100) {
        this.progress.update(p => p + (1 * this.playbackSpeed()));
      } else if (this.progress() >= 100) {
        this.isPlaying.set(false);
        this.progress.set(0);
        clearInterval(this.audioInterval);
      }
    }, 1000);
  }

  changeSpeed() {
    const current = this.playbackSpeed();
    if (current === 1) this.playbackSpeed.set(1.5);
    else if (current === 1.5) this.playbackSpeed.set(2);
    else this.playbackSpeed.set(1);
  }

  // --- Helpers ---
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}