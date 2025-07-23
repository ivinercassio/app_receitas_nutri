import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${appSettings.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  public authentication(login: Login): Observable<Token> {
      return this.http.post<Token>(`${this.apiUrl}/login`, login);
  }

  salvarToken(token: Token): void {
    localStorage.setItem("Token", token.accessToken);
  }

  getToken(): string {
    return localStorage.getItem("Token") || "";
  }

  limparToken(): void {
    localStorage.removeItem("Token");
  }

  gerarCabecalhoHTTP() {
    let token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
  }
}
