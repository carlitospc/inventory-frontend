import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FACTUS_ENDPOINT } from '../../../config/factus';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = FACTUS_ENDPOINT;
  private username = 'sandbox@factus.com.co';
  private password = 'sandbox2024%';
  private clientId = '9dfb97bf-62a5-480b-a241-3f2da9642a67';
  private clientSecret = 'EMnfTWIzJ9cXITmp6CUQzwfoLThz9IY06rUZkWla';

  private token: string | null = null;

  constructor(private http: HttpClient) { }

  obtenerToken(): Observable<any> {
    const url = `${this.apiUrl}/oauth/token`;
    const body = {
      username: this.username,
      password: this.password,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'password',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, body, { headers });
  }

  guardarTokens(accessToken: string, refreshToken: string, expiresIn: number) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('token_expiration', (Date.now() + expiresIn * 1000).toString());
  }

  obtenerAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  obtenerRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isTokenExpired(): boolean {
    const expiration = localStorage.getItem('token_expiration');
    return expiration ? Date.now() > parseInt(expiration) : true;
  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expiration');
  }
}
