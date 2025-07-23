import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingrediente } from '../models/ingrediente';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private apiUrl = `${appSettings.apiUrl}/ingredientes`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl, this.authService.gerarCabecalhoHTTP());
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  public save(ingrediente: Ingrediente): Observable<Ingrediente> {
    if (ingrediente.id) {
      return this.http.put<Ingrediente>(`${this.apiUrl}/${ingrediente.id}`, ingrediente, this.authService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Ingrediente>(this.apiUrl, ingrediente, this.authService.gerarCabecalhoHTTP());
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  // listar as ingredientes pelo id do nutricionista responsavel
  public findByNutricionista(id: number): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/nutricionista/${id}`, this.authService.gerarCabecalhoHTTP());
  }
}
