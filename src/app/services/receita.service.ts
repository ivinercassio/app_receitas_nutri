import { Injectable } from '@angular/core';
import { Receita } from '../models/receita';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private apiUrl = 'http://localhost:8080/receitas';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.apiUrl);
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public save(receita: Receita): Observable<Receita> {
    if (receita.id) {
      return this.http.put<Receita>(`${this.apiUrl}/${receita.id}`, receita);
    } else {
      return this.http.post<Receita>(this.apiUrl, receita);
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // listar as Receitas pelo id do Nutricionista responsavel
  public findByNutricionistaId(id: number): Observable<Receita[]> {
    return this.http.get<Receita[]>(`${this.apiUrl}/nutricionista/${id}`);
  }
}
