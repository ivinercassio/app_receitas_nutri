import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:8080/pacientes';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public save(paciente: Paciente): Observable<Paciente> {
    if (paciente.id) {
      return this.http.put<Paciente>(`${this.apiUrl}/${paciente.id}`, paciente);
    } else {
      return this.http.post<Paciente>(this.apiUrl, paciente);
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
