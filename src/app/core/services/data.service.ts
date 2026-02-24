import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getSlides(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/slides`); }
  getCategories(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/categories`); }
  getCollections(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/collections`); }
  
  // Get Latest Articles
  getLatestArticles(): Observable<any[]> { 
    return this.http.get<any[]>(`${this.apiUrl}/posts`).pipe(
      map(posts => posts.filter(p => p.isLatest === true))
    );
  }

  // Get Editor's Pick
  getEditorPick(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`).pipe(
      map(posts => posts.find(p => p.isEditorPick === true))
    );
  }

  // Get Single Post by ID
  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${id}`);
  }

  // 🔥 Get Posts by Category Name (Filter Logic)
  getPostsByCategory(categoryName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`).pipe(
      map(posts => posts.filter(post => post.tag.toLowerCase() === categoryName.toLowerCase()))
    );
  }

  // services/data.service.ts
getPosts() {
  return this.http.get<any[]>('http://localhost:3000/posts');
}

// private apiUrl = 'http://localhost:5000/api/v1';
private apiUrl = 'https://vicharmanch-backend.onrender.com/api/v1';

  // होम पेजचा सगळा डेटा एकाच API मधून आणण्यासाठी
  getHomeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/home`);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles/${id}`);
  }

 getArticlesByCategory(category: string) {
  // इथे '/articles/category/' बरोबर आहे ना हे चेक कर
  // return this.http.get(`http://localhost:5000/api/v1/articles/category/${category}`);
  return this.http.get(`https://vicharmanch-backend.onrender.com/api/v1/articles/category/${category}`);
}
}