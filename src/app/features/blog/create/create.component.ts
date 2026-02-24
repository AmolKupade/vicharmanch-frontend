import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
blogForm!: FormGroup;
  isSubmitting: boolean = false;

  // Dropdown Options
  categories = ['Technology', 'Philosophy', 'Startups', 'Design', 'Creator Economy', 'Culture', 'Finance'];
  seriesOptions = ['None', 'The Architect\'s Mind', 'Code & Culture', 'Modern Mythology'];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // Form Initialization with Validators
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      subtitle: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.maxLength(250)]],
      content: ['', Validators.required], // Editor content
      coverImage: ['', Validators.required], // Base64 Image
      imageCaption: [''],
      category: ['', Validators.required],
      series: ['None'],
      tags: [''],
      readTime: [5, Validators.required],
      seoTitle: [''],
      seoDesc: [''],
      scheduleDate: [''],
      isPremium: [false],
      paywallPreview: [30] // Default 30% preview for premium
    });
  }

  // --- 1. RICH TEXT EDITOR LOGIC ---
  execCmd(command: string, value: string | undefined = undefined) {
    document.execCommand(command, false, value);
  }

  onContentChange(event: any) {
    // Editor मध्ये काहीही टाईप केल्यावर ते फॉर्ममध्ये सेव्ह होईल
    this.blogForm.patchValue({
      content: event.target.innerHTML
    });
  }

  // --- 2. IMAGE UPLOAD LOGIC (Base64) ---
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large! Maximum size is 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        // इमेज Base64 स्ट्रिंग मध्ये कन्व्हर्ट करून फॉर्ममध्ये सेव्ह करणे
        this.blogForm.patchValue({
          coverImage: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(event: Event) {
    event.stopPropagation(); // फाईल अपलोड डायलॉग पुन्हा ओपन होऊ नये म्हणून
    event.preventDefault();
    this.blogForm.patchValue({
      coverImage: ''
    });
  }

  // --- 3. HELPER FUNCTION ---
  isFieldInvalid(fieldName: string): boolean {
    const field = this.blogForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // --- 4. SUBMIT TO BACKEND ---
  onSubmit() {
    if (this.blogForm.invalid) {
      // सर्व न भरलेले फिल्ड्स लाल रंगात दाखवण्यासाठी
      Object.keys(this.blogForm.controls).forEach(key => {
        this.blogForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    
    // API ला पाठवण्यासाठी डेटा तयार करणे
    const formValues = this.blogForm.value;
    
    const newArticlePayload = {
      title: formValues.title,
      desc: formValues.excerpt, // Excerpt ला आपण desc म्हणून पाठवतोय
      content: formValues.content,
      author: 'Vikram Joshi', // (इथे सध्या हार्डकोडेड आहे, नंतर Login केलेल्या युजरचं नाव येईल)
      tag: formValues.category,
      readTime: `${formValues.readTime} min read`,
      coverClass: formValues.coverImage, // आता ग्रेडियंट ऐवजी खरी इमेज लिंक/Base64 जाईल
      likes: '0',
      comments: '0'
    };

    // Backend ला डेटा पाठवणे
    this.articleService.createArticle(newArticlePayload).subscribe({
      next: (res) => {
        console.log('✅ Article published successfully!', res);
        alert('Masterpiece Published Successfully! 🎉');
        this.isSubmitting = false;
        this.blogForm.reset();
        
        // Editor रिकामा करणे
        const editor = document.querySelector('.editorial-canvas');
        if (editor) editor.innerHTML = '';
      },
      error: (err) => {
        console.error('❌ Error publishing article:', err);
        alert('Something went wrong! Check console.');
        this.isSubmitting = false;
      }
    });
  }
}
