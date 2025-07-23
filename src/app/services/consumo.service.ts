import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumo } from '../models/consumo';
import { appSettings } from '../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  private apiUrl = `${appSettings.apiUrl}/consumos`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll(): Observable<Consumo[]> {
    return this.http.get<Consumo[]>(this.apiUrl, this.authService.gerarCabecalhoHTTP());
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  public save(consumo: Consumo): Observable<Consumo> {
    if (consumo.id) {
      return this.http.put<Consumo>(`${this.apiUrl}/${consumo.id}`, consumo, this.authService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Consumo>(this.apiUrl, consumo, this.authService.gerarCabecalhoHTTP());
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }
}
