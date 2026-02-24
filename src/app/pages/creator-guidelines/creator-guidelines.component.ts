import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-creator-guidelines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creator-guidelines.component.html',
  styleUrl: './creator-guidelines.component.scss'
})
export class CreatorGuidelinesComponent implements OnInit{
activeSection: string = 'eligibility';

  navItems = [
    { id: 'eligibility', label: '1. Eligibility Criteria' },
    { id: 'quality', label: '2. Quality Standards' },
    { id: 'prohibited', label: '3. Prohibited Content' },
    { id: 'monetization', label: '4. Monetization Rules' },
    { id: 'review', label: '5. Review Process' }
  ];

  constructor() { }

  ngOnInit(): void { }

  scrollTo(sectionId: string) {
    this.activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollPosition = window.pageYOffset + 150; // Offset for fixed header

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
