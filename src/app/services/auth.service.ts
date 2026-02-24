import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:5000/api/v1/auth';
  private apiUrl = 'https://vicharmanch-backend.onrender.com/api/v1/auth';
  
  // सध्या लॉगिन असलेल्या युजरचा डेटा ॲपभर वापरण्यासाठी
  public currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    // ॲप रीलोड झाल्यावर localStorage मधून युजर चेक करणे
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  // 1. Register API Call
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((res: any) => this.saveAuthData(res)) // डेटा आला की सेव्ह करा
    );
  }

  // 2. Login API Call
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => this.saveAuthData(res))
    );
  }

  // 3. Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  // Helper Function: Token आणि User डेटा सेव्ह करण्यासाठी
  private saveAuthData(res: any) {
    if (res.success && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.currentUserSubject.next(res.user);
    }
  }
}