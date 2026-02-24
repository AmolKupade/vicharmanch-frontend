import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  // तुझी बॅकएंड API लिंक
  // private apiUrl = 'http://localhost:5000/api/v1';
  private apiUrl = 'https://vicharmanch-backend.onrender.com/api/v1';

  constructor(private http: HttpClient) { }

  // Explore पेजचा सगळा डेटा GET करण्यासाठी
  getExploreData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/explore`);
  }
}