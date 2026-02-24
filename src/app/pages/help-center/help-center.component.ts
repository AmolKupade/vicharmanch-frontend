import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [CommonModule ,RouterModule],
  templateUrl: './help-center.component.html',
  styleUrl: './help-center.component.scss'
})
export class HelpCenterComponent {
isModalOpen: boolean = false;
  selectedCategory: any = null;
  selectedArticle: any = null;

  // Full Dynamic Data for Categories and Articles
  helpCategories = [
    {
      id: 'account',
      title: 'Account & Profile',
      desc: 'Manage your account settings, password recovery, and profile verification.',
      iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      theme: { bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400', shadow: 'hover:shadow-indigo-500/10', button: 'bg-indigo-500 hover:bg-indigo-600' },
      articles: [
        { q: 'How to reset your password', a: 'To reset your password, go to the Login screen and click on "Forgot Password". Enter your registered email address, and we will send you a secure link to create a new password. The link expires in 15 minutes for security reasons.' },
        { q: 'Verifying your creator profile', a: 'Profile verification (the blue checkmark) is currently available for creators who have published at least 10 high-quality articles and maintain a clean safety record. You can apply for verification in your Profile Settings under the "Trust & Verification" tab.' },
        { q: 'Two-factor authentication (2FA) setup', a: 'We highly recommend enabling 2FA. Go to Settings > Security > Two-Factor Authentication. You can use an authenticator app like Google Authenticator or Authy to scan the QR code and link your device.' },
        { q: 'How to permanently delete your account', a: 'If you wish to leave VicharManch, go to Settings > Advanced > Delete Account. Please note that this action is irreversible. All your published articles, drafts, and followers will be permanently erased.' }
      ]
    },
    {
      id: 'publishing',
      title: 'Publishing & Editor',
      desc: 'Learn how to format text, add media, and use the VicharManch rich-text editor.',
      iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      theme: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', shadow: 'hover:shadow-emerald-500/10', button: 'bg-emerald-500 hover:bg-emerald-600' },
      articles: [
        { q: 'Using the formatting toolbar', a: 'Highlight any text while writing a draft to bring up the floating formatting toolbar. From there, you can apply bold, italics, links, and headers (H2, H3) without losing your focus.' },
        { q: 'How to embed YouTube videos', a: 'Simply paste the URL of the YouTube video on a new line and press Enter. Our editor will automatically convert the link into a beautiful, playable video player within your article.' },
        { q: 'Auto-save and Drafts management', a: 'VicharManch auto-saves your work every 10 seconds. If your browser crashes or you lose internet connection, you will find your latest edits safely stored in your "Drafts" folder.' },
        { q: 'Image sizing guidelines for covers', a: 'For the best resolution, we recommend uploading cover images in 1920x1080 pixels (16:9 ratio). Our system will automatically compress and optimize the image for faster loading.' }
      ]
    },
    {
      id: 'monetization',
      title: 'Monetization & Ads',
      desc: 'Understand creator payouts, ad revenue sharing, and affiliate link guidelines.',
      iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      theme: { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', shadow: 'hover:shadow-amber-500/10', button: 'bg-amber-500 hover:bg-amber-600' },
      articles: [
        { q: 'When do I get paid?', a: 'Earnings are calculated at the end of every month. If your balance exceeds $50 (or equivalent in INR), the payment will be automatically wired to your connected bank account by the 5th of the following month.' },
        { q: 'Setting up your Stripe account', a: 'Go to your Monetization Dashboard and click "Connect with Stripe". Follow the onboarding steps to provide your banking details. VicharManch does not store your bank data; it is securely managed by Stripe.' },
        { q: 'Rules for placing affiliate links', a: 'You may include up to 3 affiliate links per article. However, you must explicitly disclose to your readers that the article contains affiliate links, as per FTC and ASCI guidelines.' }
      ]
    },
    {
      id: 'safety',
      title: 'Trust & Safety',
      desc: 'Report violations, understand shadowbans, and read our community guidelines.',
      iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      theme: { bg: 'bg-rose-50 dark:bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', shadow: 'hover:shadow-rose-500/10', button: 'bg-rose-500 hover:bg-rose-600' },
      articles: [
        { q: 'How to report an abusive user', a: 'Navigate to the user\'s profile or the specific abusive comment. Click the three dots (...) and select "Report". Choose the reason for reporting and provide context. Our safety team reviews all reports within 24 hours.' },
        { q: 'Understanding shadowbans', a: 'A shadowban reduces the visibility of your content on the global feed. This usually happens if our automated systems detect spam-like behavior or excessive keyword stuffing. If you believe this is a mistake, you can appeal via support.' },
        { q: 'Community Guidelines summary', a: 'VicharManch thrives on respect. We do not tolerate hate speech, doxxing, harassment, or plagiarism. Violating these core rules may result in an immediate and permanent account ban.' }
      ]
    },
    {
      id: 'api',
      title: 'API & Developers',
      desc: 'Documentation for embedding blogs, webhooks, and accessing the VicharManch API.',
      iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      theme: { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', shadow: 'hover:shadow-blue-500/10', button: 'bg-blue-500 hover:bg-blue-600' },
      articles: [
        { q: 'Generating your API keys', a: 'To generate an API key, go to Settings > Developer Options > API Keys. Click "Generate New Key". Remember to keep your Secret Key safe, as it will only be shown to you once.' },
        { q: 'Rate limits and quotas', a: 'Standard API access allows up to 1,000 requests per hour per IP address. If you require a higher limit for enterprise use, please contact our Developer Support team.' },
        { q: 'Setting up Webhooks', a: 'Webhooks can be configured in the Developer Dashboard. You can subscribe to events like "article.published" or "comment.created" to sync data with your external servers in real-time.' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal & DMCA',
      desc: 'Copyright claims, privacy policy details, and terms of service inquiries.',
      iconPath: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15',
      theme: { bg: 'bg-purple-50 dark:bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', shadow: 'hover:shadow-purple-500/10', button: 'bg-purple-500 hover:bg-purple-600' },
      articles: [
        { q: 'How to file a DMCA takedown', a: 'If you believe your copyrighted work has been posted without permission, please email our legal team at copyright@vicharmanch.com with the specific URLs and proof of your original content.' },
        { q: 'Privacy Policy updates', a: 'Our privacy policy outlines how we collect, use, and protect your data. We never sell personal data to third parties. For a complete read, visit the Privacy Policy page linked in our footer.' },
        { q: 'Data retention policy', a: 'When you delete your account, your personal data and articles are wiped from our active servers within 30 days. However, certain transactional logs may be retained for up to 12 months for legal compliance.' }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  // Modal Functions
  openModal(category: any) {
    this.selectedCategory = category;
    this.selectedArticle = null; 
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; 
  }

  openArticle(article: any) {
    this.selectedArticle = article;
  }

  backToList() {
    this.selectedArticle = null;
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto'; 
    setTimeout(() => {
      this.selectedCategory = null;
      this.selectedArticle = null;
    }, 300); 
  }


}
