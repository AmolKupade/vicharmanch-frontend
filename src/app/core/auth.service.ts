import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // 🔴 जुनी लिंक काढून टाक: 
  // private apiUrl = 'http://localhost:5000/api/v1/auth';
  
  // ✅ नवीन लिंक (तुझ्या बॅकएंडनुसार):
//  private apiUrl = 'http://localhost:5000/api/users';

 private apiUrl = 'https://vicharmanch-backend.onrender.com/api/users';

  public currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  // 1. Register API Call -> आता हे बरोबर http://localhost:5000/api/users/register वर जाईल
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((res: any) => this.saveAuthData(res))
    );
  }

  // 2. Login API Call -> हे http://localhost:5000/api/users/login वर जाईल
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => this.saveAuthData(res))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  private saveAuthData(res: any) {
    if (res.success && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.currentUserSubject.next(res.user);
    }
  }

  // auth.service.ts मध्ये ॲड कर:
forgotPassword(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/forgot-password`, { email });
}
}