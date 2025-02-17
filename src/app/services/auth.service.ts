// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://cage-api.onrender.com/api/admin';
  

  // Track login state using BehaviorSubject
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.loggedIn.asObservable(); // Expose as observable

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
  
    return this.http.post(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('LoggedIn', 'true');
            this.loggedIn.next(true); // 🔹 Update login state
          }
        })
      );
     
      
  }

  logout(): void {
    localStorage.removeItem('token');
 
    localStorage.removeItem('LoggedIn');
    this.loggedIn.next(false); // 🔹 Update login state
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('LoggedIn') === 'true'  && this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
