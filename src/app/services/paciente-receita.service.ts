import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PacienteReceita } from '../models/paciente-receita';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteReceitaService {

  private apiUrl = `${appSettings.apiUrl}/pacientes-receitas`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll(): Observable<PacienteReceita[]> {
    return this.http.get<PacienteReceita[]>(this.apiUrl, this.authService.gerarCabecalhoHTTP());
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  public save(pacienteReceita: PacienteReceita): Observable<PacienteReceita> {
    if (pacienteReceita.id) {
      return this.http.put<PacienteReceita>(`${this.apiUrl}/${pacienteReceita.id}`, pacienteReceita, this.authService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<PacienteReceita>(this.apiUrl, pacienteReceita, this.authService.gerarCabecalhoHTTP());
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  // listar PacienteReceita pelo id do Paciente
  public findByPacienteId(id: number): Observable<PacienteReceita[]> {
    return this.http.get<PacienteReceita[]>(`${this.apiUrl}/paciente/${id}`, this.authService.gerarCabecalhoHTTP());
  }
}
