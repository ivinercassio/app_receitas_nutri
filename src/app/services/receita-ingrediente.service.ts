import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceitaIngrediente } from '../models/receita-ingrediente';

@Injectable({
  providedIn: 'root'
})
export class ReceitaIngredienteIngredienteService {

  private apiUrl = 'http://localhost:8080/receitaIngredientes-ingredientes';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<ReceitaIngrediente[]> {
    return this.http.get<ReceitaIngrediente[]>(this.apiUrl);
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public save(receitaIngrediente: ReceitaIngrediente): Observable<ReceitaIngrediente> {
    if (receitaIngrediente.id) {
      return this.http.put<ReceitaIngrediente>(`${this.apiUrl}/${receitaIngrediente.id}`, receitaIngrediente);
    } else {
      return this.http.post<ReceitaIngrediente>(this.apiUrl, receitaIngrediente);
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
