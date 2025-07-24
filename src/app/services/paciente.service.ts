import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Observable } from 'rxjs';
import { appSettings } from '../app.config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = `${appSettings.apiUrl}/pacientes`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl, this.authService.gerarCabecalhoHTTP());
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }

  public getByEmail(email: string) {
    return this.http.get(`${this.apiUrl}/email/${email}`);
  }

  public save(paciente: Paciente): Observable<Paciente> {
    if (paciente.id) {
      return this.http.put<Paciente>(`${this.apiUrl}/${paciente.id}`, paciente, this.authService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Paciente>(this.apiUrl, paciente, this.authService.gerarCabecalhoHTTP());
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.gerarCabecalhoHTTP());
  }
}
