import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nutricionista } from '../models/nutricionista';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaService {

  private apiUrl = `${appSettings.apiUrl}/nutricionistas`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll(): Observable<Nutricionista[]> {
    return this.http.get<Nutricionista[]>(this.apiUrl, this.authService.gerarCabecalhoHTTP());
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  public getByEmail(email: string) {
    return this.http.get(`${this.apiUrl}/email/${email}`);
  }

  public save(nutricionista: Nutricionista): Observable<Nutricionista> {
    if (nutricionista.id) {
      return this.http.put<Nutricionista>(`${this.apiUrl}/${nutricionista.id}`, nutricionista, this.authService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Nutricionista>(this.apiUrl, nutricionista, this.authService.gerarCabecalhoHTTP());
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }
}
