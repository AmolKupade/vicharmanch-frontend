import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formatting-guide',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './formatting-guide.component.html',
  styleUrl: './formatting-guide.component.scss'
})
export class FormattingGuideComponent {
  
  // Navigation Links for the sticky sidebar
  navItems = [
    { id: 'typography', label: 'Typography' },
    { id: 'headings', label: 'Headings' },
    { id: 'quotes', label: 'Blockquotes' },
    { id: 'lists', label: 'Lists' },
    { id: 'code', label: 'Code Blocks' },
    { id: 'media', label: 'Media & Images' },
  ];

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}