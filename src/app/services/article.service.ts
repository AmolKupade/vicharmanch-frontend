import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  // तुझी बॅकएंड API लिंक (Port 5000)
  // private apiUrl = 'http://localhost:5000/api/v1';
  private apiUrl = 'https://vicharmanch-backend.onrender.com/api/v1';

  // HttpClient इंजेक्ट करणे खूप महत्त्वाचे आहे
  constructor(private http: HttpClient) { }

  // 🔴 हे ते फंक्शन आहे जे मिसिंग होतं: नवीन आर्टिकल MongoDB मध्ये सेव्ह करण्यासाठी
  createArticle(articleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/articles`, articleData);
  }
}