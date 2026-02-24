import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-partner-program',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './partner-program.component.html',
  styleUrl: './partner-program.component.scss'
})
export class PartnerProgramComponent {
  
  views = 50000;
  estimatedEarnings = 0;

  // 🌟 NEW: Perks Data
  perks = [
    { icon: '📊', title: 'Deep Analytics', desc: 'Understand your audience with real-time stats on read ratio, traffic sources, and demographics.' },
    { icon: '🌍', title: 'Built-in SEO', desc: 'Our platform is highly optimized for Google. Your stories rank faster and reach a global audience.' },
    { icon: '💌', title: 'Own Your Audience', desc: 'Build your mailing list directly on VicharManch and take your subscribers with you anytime.' }
  ];

  // 🌟 NEW: Testimonials Data
  testimonials = [
    { quote: "VicharManch वर शिफ्ट होणे हा माझा बेस्ट निर्णय होता. इथली ऑडियन्स एकदम क्वालिटी आहे आणि कमाई पण वेळेवर बँक अकाउंटमध्ये येते!", author: "Dr. Amit Patil", role: "Top Tech Writer", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    { quote: "I love the clean editor and how easily my stories find the right audience. The monthly payouts are just the cherry on top!", author: "Sneha Kulkarni", role: "Lifestyle Blogger", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
    { quote: "Finally, a platform that respects Indian creators. The analytics dashboard helps me understand exactly what my readers want.", author: "Rahul D.", role: "Finance Expert", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" }
  ];

  // Eligibility Checklist
  requirements = [
    'Be at least 18 years old.',
    'Have published at least 1 story on VicharManch.',
    'Have a valid Indian Bank Account (for payouts).',
    'Follow our Creator Community Guidelines.'
  ];

  faqs = [
    { question: 'How do I get paid?', answer: 'Earnings are calculated based on premium member reading time. We process payments securely via Stripe/Razorpay on the 1st of every month directly to your Indian bank account.' },
    { question: 'Are there any hidden fees?', answer: 'No. Joining the Partner Program is 100% free for writers. We take a small platform cut from premium subscriptions to keep the servers running.' },
    { question: 'Can I publish my stories in Marathi or Hindi?', answer: 'Absolutely! VicharManch supports multiple regional languages. Regional content actually has a very high engagement rate.' },
    { question: 'What qualifies a story for monetization?', answer: 'Stories must follow our Community Guidelines and pass a basic quality check. Plagiarized or AI-generated spam is strictly prohibited.' }
  ];

  constructor() {
    this.calculateEarnings();
  }

  onSliderChange(event: any) {
    this.views = event.target.value;
    this.calculateEarnings();
  }

  calculateEarnings() {
    // समजा 1000 views ला ₹250 मिळतात (Mock Rate)
    this.estimatedEarnings = Math.round((this.views / 1000) * 250);
  }

  formatNumber(num: number): string {
    // भारतीय पद्धतीनुसार कॉमा देण्यासाठी (e.g., 1,00,000)
    return new Intl.NumberFormat('en-IN').format(num);
  }
}