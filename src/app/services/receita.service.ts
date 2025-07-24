import { Injectable } from '@angular/core';
import { Receita } from '../models/receita';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private apiUrl = `${appSettings.apiUrl}/receitas`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.apiUrl, this.authService.gerarCabecalhoHTTP());
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public save(receita: Receita): Observable<Receita> {
    if (receita.id) {
      return this.http.put<Receita>(`${this.apiUrl}/${receita.id}`, receita, this.authService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Receita>(this.apiUrl, receita, this.authService.gerarCabecalhoHTTP());
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  // listar as Receitas pelo id do Nutricionista responsavel
  public findByNutricionistaId(id: number): Observable<Receita[]> {
    return this.http.get<Receita[]>(`${this.apiUrl}/nutricionista/${id}`, this.authService.gerarCabecalhoHTTP());
  }
}
