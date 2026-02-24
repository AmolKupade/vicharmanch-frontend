import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-creator-analytics',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './creator-analytics.component.html',
  styleUrl: './creator-analytics.component.scss'
})
export class CreatorAnalyticsComponent {
  
  // Header Stats
  kpiStats = [
    { label: 'Total Views', value: '1,42,530', trend: '+12.5%', isUp: true, icon: '👁️' },
    { label: 'Total Reads', value: '89,210', trend: '+8.2%', isUp: true, icon: '📖' },
    { label: 'Read Ratio', value: '62.5%', trend: '-1.2%', isUp: false, icon: '📊' },
    { label: 'Earnings (30 Days)', value: '₹45,250', trend: '+24.5%', isUp: true, icon: '💰', isHighlight: true }
  ];

  // Chart Data
  chartBars = [
    { day: 'Mon', views: 60, reads: 40 },
    { day: 'Tue', views: 80, reads: 55 },
    { day: 'Wed', views: 45, reads: 30 },
    { day: 'Thu', views: 90, reads: 65 },
    { day: 'Fri', views: 100, reads: 75 },
    { day: 'Sat', views: 120, reads: 85 },
    { day: 'Sun', views: 85, reads: 60 }
  ];

  // Table Data
  topStories = [
    { title: 'The Age of AI Agents in India', date: 'Feb 18, 2026', views: '45,200', reads: '32,100', earnings: '₹12,450', status: 'Published' },
    { title: 'Why I left my 9-to-5 for Writing', date: 'Feb 10, 2026', views: '28,500', reads: '18,200', earnings: '₹8,100', status: 'Published' },
    { title: 'Mastering Angular 19 Zoneless', date: 'Feb 05, 2026', views: '15,300', reads: '10,500', earnings: '₹4,500', status: 'Published' },
    { title: 'Financial Freedom at 30', date: 'Jan 28, 2026', views: '53,400', reads: '41,200', earnings: '₹20,200', status: 'Published' }
  ];

  navItems = [
    { id: 'typography', label: 'Typography' },
    { id: 'headings', label: 'Headings' },
    { id: 'quotes', label: 'Blockquotes' },
    { id: 'lists', label: 'Lists' },
    { id: 'code', label: 'Code Blocks' },
    { id: 'tables', label: 'Tables & Data' }, // NEW
    { id: 'shortcuts', label: 'Keyboard Shortcuts' }, // NEW
    { id: 'media', label: 'Media & Images' },
    { id: 'embeds', label: 'Rich Embeds' },
    { id: 'dividers', label: 'Dividers' },
    { id: 'guidelines', label: 'Editorial Rules' },
  ];

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Sources Data
  trafficSources = [
    { source: 'VicharManch Internal', percent: 45, color: 'bg-indigo-500' },
    { source: 'Google Search', percent: 30, color: 'bg-emerald-500' },
    { source: 'Twitter / X', percent: 15, color: 'bg-slate-800 dark:bg-slate-300' },
    { source: 'Direct / Email', percent: 10, color: 'bg-pink-500' }
  ];

  // 🌟 NEW: Geography Data
  audienceGeo = [
    { country: 'India', flag: '🇮🇳', percent: 65 },
    { country: 'United States', flag: '🇺🇸', percent: 18 },
    { country: 'United Kingdom', flag: '🇬🇧', percent: 8 },
    { country: 'Canada', flag: '🇬🇧', percent: 5 },
    { country: 'Others', flag: '🌍', percent: 4 }
  ];

  // 🌟 NEW: Device Data
  deviceStats = [
    { device: 'Mobile', icon: '📱', percent: 68, color: 'bg-indigo-500' },
    { device: 'Desktop', icon: '💻', percent: 28, color: 'bg-purple-500' },
    { device: 'Tablet', icon: '📟', percent: 4, color: 'bg-pink-500' }
  ];

  // 🌟 NEW: Community Engagement
  communityStats = {
    newSubscribers: 245,
    totalSubscribers: 12400,
    claps: '14.2k',
    comments: 845
  };
}