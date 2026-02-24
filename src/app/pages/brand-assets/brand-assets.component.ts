import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-assets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-assets.component.html',
  styleUrl: './brand-assets.component.scss'
})
export class BrandAssetsComponent {
copiedHex: string | null = null;

  // Brand Colors Data
  brandColors = [
    { name: 'Vichar Indigo', hex: '#6366F1', bgClass: 'bg-indigo-500', textClass: 'text-indigo-500' },
    { name: 'Creator Purple', hex: '#A855F7', bgClass: 'bg-purple-500', textClass: 'text-purple-500' },
    { name: 'Trust Emerald', hex: '#10B981', bgClass: 'bg-emerald-500', textClass: 'text-emerald-500' },
    { name: 'Alert Rose', hex: '#F43F5E', bgClass: 'bg-rose-500', textClass: 'text-rose-500' },
    { name: 'Deep Slate', hex: '#0F172A', bgClass: 'bg-slate-900', textClass: 'text-slate-900 dark:text-slate-100', border: true },
    { name: 'Paper White', hex: '#FFFFFF', bgClass: 'bg-white', textClass: 'text-slate-900', border: true }
  ];

  constructor() { }

  ngOnInit(): void { }

  // Hex Code कॉपी करण्यासाठी लॉजिक
  copyToClipboard(hex: string) {
    navigator.clipboard.writeText(hex).then(() => {
      this.copiedHex = hex;
      
      // 2 सेकंदांनंतर 'Copied' मेसेज घालवण्यासाठी
      setTimeout(() => {
        this.copiedHex = null;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy hex code: ', err);
    });
  }

  // फाईल डाऊनलोड मॉक फंक्शन
  downloadAsset(assetName: string) {
    console.log(`Downloading ${assetName}... (Attach actual file link here)`);
    // इथे तू तुझी ॲक्चुअल फाईल लिंक देऊ शकतोस.
  }
}
