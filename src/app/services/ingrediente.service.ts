import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingrediente } from '../models/ingrediente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private apiUrl = 'http://localhost:8080/ingredientes';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl);
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public save(ingrediente: Ingrediente): Observable<Ingrediente> {
    if (ingrediente.id) {
      return this.http.put<Ingrediente>(`${this.apiUrl}/${ingrediente.id}`, ingrediente);
    } else {
      return this.http.post<Ingrediente>(this.apiUrl, ingrediente);
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // listar as ingredientes pelo id do nutricionista responsavel
  public findByNutricionista(id: number): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}/nutricionista/${id}`);
  }
}
