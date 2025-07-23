import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceitaIngrediente } from '../models/receita-ingrediente';
import { appSettings } from '../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitaIngredienteService {

  private apiUrl = `${appSettings.apiUrl}/receitas-ingredientes`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll(): Observable<ReceitaIngrediente[]> {
    return this.http.get<ReceitaIngrediente[]>(this.apiUrl, this.authService.gerarCabecalhoHTTP());
  }

  public findAllByIngredienteDescricao(descricao: string): Observable<ReceitaIngrediente[]> {
    return this.http.get<ReceitaIngrediente[]>(`${this.apiUrl}/ingrediente/${descricao}`);
  }

  public findAllByReceitaId(id: number): Observable<ReceitaIngrediente[]> {
    return this.http.get<ReceitaIngrediente[]>(`${this.apiUrl}/receita/${id}`)
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  public save(receitaIngrediente: ReceitaIngrediente): Observable<ReceitaIngrediente> {
    if (receitaIngrediente.id) {
      return this.http.put<ReceitaIngrediente>(`${this.apiUrl}/${receitaIngrediente.id}`, receitaIngrediente, this.authService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<ReceitaIngrediente>(this.apiUrl, receitaIngrediente, this.authService.gerarCabecalhoHTTP());
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }
}
