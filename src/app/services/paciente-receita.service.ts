import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PacienteReceita } from '../models/paciente-receita';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteReceitaService {

  private apiUrl = 'http://localhost:8080/pacientes-receitas';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PacienteReceita[]> {
    return this.http.get<PacienteReceita[]>(this.apiUrl);
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public save(pacienteReceita: PacienteReceita): Observable<PacienteReceita> {
    if (pacienteReceita.id) {
      return this.http.put<PacienteReceita>(`${this.apiUrl}/${pacienteReceita.id}`, pacienteReceita);
    } else {
      return this.http.post<PacienteReceita>(this.apiUrl, pacienteReceita);
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // listar PacienteReceita pelo id do Paciente
  public findByPacienteId(id: number): Observable<PacienteReceita[]> {
    return this.http.get<PacienteReceita[]>(`${this.apiUrl}/paciente/${id}`);
  }
}
