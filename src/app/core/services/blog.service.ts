import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BlogService {
  // private apiUrl = 'http://localhost:5000/api/blogs'; // API URL
  private apiUrl = 'https://vicharmanch-backend.onrender.com/api/blogs'; // API URL
  private http = inject(HttpClient);

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}