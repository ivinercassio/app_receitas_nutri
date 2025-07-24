import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { appSettings } from '../app.config';
import { NutricionistaService } from './nutricionista.service';
import { PacienteService } from './paciente.service';
import { Nutricionista } from '../models/nutricionista';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${appSettings.apiUrl}/usuarios`;

  constructor(private http: HttpClient, private nutriService: NutricionistaService, private pacienteService: PacienteService) { }

  public findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  public save(usuario: Usuario): Observable<Usuario> {
    if (usuario.id) {
      return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
    } else {
      return this.http.post<Usuario>(this.apiUrl, usuario);
    }
  }

  public salvarUsuario(login: string, nivel: string): void {
    if (nivel == "NUTRICIONISTA")
      this.getNutricionista(login);
    else
      this.getPaciente(login);
  }

  private getNutricionista(login: string) {
    this.nutriService.getByEmail(login).subscribe({
      next: (nutri) => {
        let nutricionista = new Nutricionista();
        Object.assign(nutricionista, nutri);
        this.salvarNomeUsuario(nutricionista.nome);
        
      }, error: (erro) => {
        console.warn("Erro na busca por nutricionista" + erro);
      }
    });
  }

  private getPaciente(login: string) {
    this.pacienteService.getByEmail(login).subscribe({
      next: (resultado) => {
        let paciente = new Paciente();
        Object.assign(paciente, resultado);
        this.salvarNomeUsuario(paciente.nome);
        
      }, error: (erro) => {
        console.warn("Erro na busca por paciente" + erro);
      }
    });
  }

  private salvarNomeUsuario(nome: string): void {
    localStorage.setItem("NomeUsuario", nome);
  }

  public getUsuario(): string {
    return localStorage.getItem("NomeUsuario") || "";
  }

  public limparUsuario(): void {
    localStorage.removeItem("NomeUsuario");
  }
}
