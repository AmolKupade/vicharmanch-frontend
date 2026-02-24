import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss'
})
export class PodcastsComponent {
currentlyPlaying: any = null;
  isPlaying: boolean = false;

  // Categories
  categories = ['All Episodes', 'Creator Economy', 'Philosophy', 'Tech & Future', 'Storytelling', 'Interviews'];
  activeCategory = 'All Episodes';

  // Featured Hero Episode
  featuredEpisode = {
    id: 'ep-00',
    title: 'The Future of the Indian Creator Economy',
    host: 'Vikram Joshi',
    guest: 'Aditi Sharma',
    duration: '45:20',
    date: 'Feb 18, 2026',
    tag: 'VicharManch Original',
    desc: 'In this exclusive episode, we dive deep into how AI and decentralized platforms are shifting the power from big tech back to independent writers and creators.',
    coverBg: 'from-indigo-600 to-purple-800'
  };

  // Trending Episodes List
  trendingEpisodes = [
    {
      id: 'ep-01',
      title: 'Finding Your Authentic Voice in a Noisy World',
      host: 'Riya Desai',
      duration: '32:15',
      date: 'Feb 15, 2026',
      category: 'Philosophy',
      coverBg: 'from-emerald-400 to-teal-600'
    },
    {
      id: 'ep-02',
      title: 'Monetization 101: Beyond Ads and Sponsorships',
      host: 'Karan Mehta',
      duration: '50:40',
      date: 'Feb 12, 2026',
      category: 'Creator Economy',
      coverBg: 'from-amber-400 to-orange-600'
    },
    {
      id: 'ep-03',
      title: 'The Art of Storytelling in Tech Journalism',
      host: 'Neha Singh',
      duration: '28:55',
      date: 'Feb 10, 2026',
      category: 'Storytelling',
      coverBg: 'from-rose-400 to-pink-600'
    },
    {
      id: 'ep-04',
      title: 'Web3 and the Ownership of Digital Content',
      host: 'Amit Patel',
      duration: '42:10',
      date: 'Feb 08, 2026',
      category: 'Tech & Future',
      coverBg: 'from-blue-500 to-indigo-700'
    },
    {
      id: 'ep-05',
      title: 'Overcoming Writer\'s Block with Mindfulness',
      host: 'Dr. Sameer',
      duration: '35:00',
      date: 'Feb 05, 2026',
      category: 'Philosophy',
      coverBg: 'from-purple-500 to-fuchsia-700'
    },
    {
      id: 'ep-06',
      title: 'Building a Loyal Community from Scratch',
      host: 'Priya Kapoor',
      duration: '48:30',
      date: 'Feb 01, 2026',
      category: 'Interviews',
      coverBg: 'from-slate-700 to-slate-900'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  // Play Episode Function
  playEpisode(episode: any) {
    if (this.currentlyPlaying?.id === episode.id) {
      // Toggle Play/Pause if it's the same episode
      this.isPlaying = !this.isPlaying;
    } else {
      // Play new episode
      this.currentlyPlaying = episode;
      this.isPlaying = true;
    }
  }

  // Set Active Category
  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}
