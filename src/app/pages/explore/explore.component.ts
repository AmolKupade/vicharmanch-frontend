import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ExploreService } from '../../services/explore.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})

export class ExploreComponent implements OnInit {

searchQuery: string = '';
  isLoading: boolean = true; // डेटा येईपर्यंत लोडिंग दाखवण्यासाठी

  categories = ['For You', 'Technology', 'Startups', 'Creator Economy', 'Philosophy', 'Design', 'Finance', 'Culture', 'Web3', 'AI & Future'];
  activeCategory = 'For You';

  // 1. Hero Top Stories (आपण हे सध्या मॅन्युअली ठेवू किंवा आर्टिकल्समधून घेऊ शकतो)
  heroStories = [
    { title: 'The AI Renaissance: Machines That Feel', desc: 'An interactive deep-dive into neural networks simulating human empathy. Are we ready for emotional machines, or is it just complex math?', author: 'Dr. Siddharth', tag: 'DEEP DIVE', read: '12 min', bg: 'from-indigo-900 to-purple-900', size: 'large' },
    { title: 'Why 5 AM Routines are Toxic', author: 'Aditi Sharma', tag: 'OPINION', read: '5 min', bg: 'from-orange-500 to-rose-600', size: 'small' },
    { title: 'Micro-SaaS Built in 30 Days', author: 'Karan Mehta', tag: 'CASE STUDY', read: '8 min', bg: 'from-emerald-500 to-teal-700', size: 'small' }
  ];

  discussions = [
    { topic: 'Is AI art actually art? The great debate.', comments: 342, time: '2h ago' },
    { topic: 'Remote work vs Office: The 2026 verdict', comments: 890, time: '5h ago' }
  ];

  // 🔴 हे ॲरे आता बॅकएंडमधून भरले जातील (हार्डकोडेड नाही!)
  feedArticles: any[] = [];
  filteredArticles: any[] = [];
  topCreators: any[] = [];
  podcasts: any[] = [];

  constructor(private exploreService: ExploreService) { }

  ngOnInit(): void {
    this.fetchDataFromBackend();
  }

  // API मधून डेटा आणणारे फंक्शन
  fetchDataFromBackend() {
    this.exploreService.getExploreData().subscribe({
      next: (response) => {
        // बॅकएंडमधून आलेला डेटा आपल्या व्हेरिएबल्समध्ये टाकणे
        this.feedArticles = response.data.feedArticles;
        this.filteredArticles = this.feedArticles; // सर्चसाठी डिफॉल्ट
        this.topCreators = response.data.topCreators;
        this.podcasts = response.data.trendingPodcasts;

        this.isLoading = false; // डेटा आला की लोडिंग बंद
        console.log('🔥 Backend Data Loaded Successfully!', response.data);
      },
      error: (error) => {
        console.error('❌ Error fetching data:', error);
        this.isLoading = false;
      }
    });
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  // तुझा आधीचा सर्च लॉजिक तसाच राहील
  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    
    if (!this.searchQuery) {
      this.filteredArticles = this.feedArticles;
      return;
    }

    this.filteredArticles = this.feedArticles.filter(a => 
      a.title.toLowerCase().includes(this.searchQuery) || 
      a.desc.toLowerCase().includes(this.searchQuery) ||
      a.author.toLowerCase().includes(this.searchQuery) ||
      a.tag.toLowerCase().includes(this.searchQuery)
    );
  }
 

}