import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

interface Login {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  login(username: string, password: string) {
    const loginBody: Login = {
      username,
      password,
    };
    console.log(loginBody);
    return this.http.post(`${this.baseUrl}/api/Login`, loginBody, {
      responseType: 'text',
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }
}
