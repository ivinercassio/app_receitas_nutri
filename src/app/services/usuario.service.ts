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
      this.salvarNutricionistaNome(login);
    else if (nivel == "PACIENTE")
      this.salvarPacienteNome(login);
    else
      this.salvarNomeUsuario(nivel);
    this.salvarLogin(login);
  }

  private salvarNutricionistaNome(login: string) {
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

  private salvarPacienteNome(login: string) {
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

  public getUsuarioNome(): string {
    return localStorage.getItem("NomeUsuario") || "";
  }

  public limparUsuario(): void {
    localStorage.removeItem("NomeUsuario");
    localStorage.removeItem("Login");
  }

  private salvarLogin(login: string): void {
    localStorage.setItem("Login", login);
  }

  public getLogin(): string {
    return localStorage.getItem("Login") || "";
  }

  public getUsuario(): Nutricionista | Paciente | undefined {
    let login = this.getLogin();
    const dadosToken = this.authService.extrairDadosToken();
    if (dadosToken && dadosToken.roles) {
      var nivel = dadosToken.roles.replace(/^ROLE_/, '');
      if (nivel == "NUTRICIONISTA")
        return this.getNutricionista(login);
      else if (nivel == "PACIENTE")
        return this.getPaciente(login);
    } else {
      console.warn("Erro em identificar o nivel do usuario pelo token");
    }
    return undefined;
  }

  private getNutricionista(login: string): Nutricionista {
    var nutri = new Nutricionista();
    this.nutriService.getByEmail(login).subscribe({
      next: (resultado) => {
        Object.assign(nutri, resultado);;
      }, error: (erro) => {
        console.warn("Erro na busca por paciente" + erro);
      }
    });
    return nutri;
  }

  private getPaciente(login: string): Paciente {
    var paciente = new Paciente();
    this.pacienteService.getByEmail(login).subscribe({
      next: (resultado) => {
        Object.assign(paciente, resultado);;
      }, error: (erro) => {
        console.warn("Erro na busca por paciente" + erro);
      }
    });
    return paciente;
  }
}
