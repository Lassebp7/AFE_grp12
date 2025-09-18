import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint: string = '/api/Login';
  private baseUrl: string = environment.apiUrl;
  private TOKEN_KEY: string = 'auth_token';

  // very unsafe, yes, we know!
  private credentials = {
    username: 'gruppe12@bank.dk',
    password: '1234',
  };

  private http = inject(HttpClient);

  isAuthenticated() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string | null): boolean {
    console.log(token);
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (this.isTokenExpired(token)) {
      console.log('token expired');
      return this.loginDefault().pipe(switchMap(() => of(localStorage.getItem(this.TOKEN_KEY))));
    }

    return of(token);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  login(username: string, password: string) {
    return this.http
      .post(
        `${this.baseUrl}/api/Login`,
        { username, password },
        {
          responseType: 'text',
        }
      )
      .pipe(tap((response) => this.setToken(response)));
  }

  loginDefault() {
    return this.http
      .post(`${this.baseUrl}${this.endpoint}`, this.credentials, { responseType: 'text' })
      .pipe(tap((response) => this.setToken(response)));
  }
}
