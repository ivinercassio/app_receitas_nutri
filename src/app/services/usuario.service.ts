import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { appSettings } from '../app.config';
import { NutricionistaService } from './nutricionista.service';
import { PacienteService } from './paciente.service';
import { Nutricionista } from '../models/nutricionista';
import { Paciente } from '../models/paciente';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${appSettings.apiUrl}/usuarios`;

  constructor(private http: HttpClient, private nutriService: NutricionistaService, private pacienteService: PacienteService, private authService: AuthService) { }

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

  // salva o login e o nome do usuario
  public salvarUsuario(login: string, nivel: string): void {
    if (nivel == "NUTRICIONISTA")
      this.salvarDadosNutricionista(login);
    else if (nivel == "PACIENTE")
      this.salvarDadosPaciente(login);
    else
      this.salvarDadosUsuario(nivel);
    this.salvarLogin(login);
  }

  private salvarDadosNutricionista(login: string) {
    this.nutriService.getByEmail(login).subscribe({
      next: (nutri) => {
        let nutricionista = new Nutricionista();
        Object.assign(nutricionista, nutri);
        let objeto = {
          id: nutricionista.id,
          nome: nutricionista.nome
        }
        this.salvarDadosUsuario(JSON.stringify(objeto));
      }, error: (erro) => {
        console.warn("Erro na busca por nutricionista" + erro);
      }
    });
  }

  private salvarDadosPaciente(login: string) {
    this.pacienteService.getByEmail(login).subscribe({
      next: (resultado) => {
        let paciente = new Paciente();
        Object.assign(paciente, resultado);
        let objeto = {
          id: paciente.id,
          nome: paciente.nome
        }
        this.salvarDadosUsuario(JSON.stringify(objeto));

      }, error: (erro) => {
        console.warn("Erro na busca por paciente" + erro);
      }
    });
  }

  private salvarDadosUsuario(json: string): void {
    localStorage.setItem("DadosUsuario", json);
  }

  public getDadosUsuario(): string {
    return localStorage.getItem("DadosUsuario") || "";
  }

  public limparUsuario(): void {
    localStorage.removeItem("DadosUsuario");
    localStorage.removeItem("Login");
  }

  private salvarLogin(login: string): void {
    localStorage.setItem("Login", login);
  }

  public getLogin(): string {
    return localStorage.getItem("Login") || "";
  }  
}
