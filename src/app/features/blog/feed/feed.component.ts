import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../core/services/blog.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component'; // Bottom Navbar Import

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, NavbarComponent], // Navbar add kara
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  blogs = signal<any[]>([]); // Signals
  isLoading = true;
  
  private blogService = inject(BlogService);

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs.set(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}