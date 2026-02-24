import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creator-apply',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creator-apply.component.html',
  styleUrl: './creator-apply.component.scss'
})
export class CreatorApplyComponent implements OnInit{
currentStep: number = 1;
  totalSteps: number = 3;
  isSubmitting: boolean = false;
  isSuccess: boolean = false;

  // Selected Category
  selectedNiche: string = '';
  niches = ['Technology', 'Philosophy', 'Creator Economy', 'Startups', 'Design', 'Other'];

  constructor() { }

  ngOnInit(): void { }

  // Step Navigation
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectNiche(niche: string) {
    this.selectedNiche = niche;
  }

  // Submit Application
  submitApplication() {
    this.isSubmitting = true;
    
    // Simulate API Call (3 seconds delay)
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
    }, 3000);
  }
}
