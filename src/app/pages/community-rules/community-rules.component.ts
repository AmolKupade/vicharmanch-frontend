import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-rules',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-rules.component.html',
  styleUrl: './community-rules.component.scss'
})

export class CommunityRulesComponent implements OnInit {

  // १. नेव्हिगेशन आयटम्सची लिस्ट
  navItems = [
    { id: 'values', label: 'Our Values' },
    { id: 'respect', label: 'Respect & Kindness' },
    { id: 'originality', label: 'Original Content' },
    { id: 'spam', label: 'No Spam Policy' },
    { id: 'enforcement', label: 'Enforcement' }
  ];

  activeSection: string = 'values'; // डिफॉल्ट ॲक्टिव्ह सेक्शन

  constructor() { }

  ngOnInit(): void { }

  // २. स्मूथ स्क्रोल फंक्शन
  scrollTo(sectionId: string) {
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }

  // ३. स्क्रोल स्पाय (Scroll-spy) लॉजिक - स्क्रोल करताना बटन हायलाईट करण्यासाठी
  @HostListener('window:scroll')
  onScroll() {
    const scrollPosition = window.pageYOffset + 150; // थोडा ऑफसेट दिलाय जेणेकरून वेळेवर हायलाईट होईल

    for (const item of this.navItems) {
      const element = document.getElementById(item.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          this.activeSection = item.id;
        }
      }
    }
  }

}
