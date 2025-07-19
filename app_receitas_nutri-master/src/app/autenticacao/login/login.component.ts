import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../servicos/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  modoLogin = true; // Alterna entre login e registro
  formulario: FormGroup;
  erro = '';
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      nome: [''], // Obrigatório apenas no registro
      tipoUsuario: [2] // Padrão: paciente
    });
  }

  alternarModo() {
    this.modoLogin = !this.modoLogin;
    this.erro = '';
    
    // Atualiza validações
    const nomeControl = this.formulario.get('nome');
    if (this.modoLogin) {
      nomeControl?.clearValidators();
    } else {
      nomeControl?.setValidators([Validators.required]);
    }
    nomeControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.formulario.invalid) return;
    
    this.carregando = true;
    this.erro = '';
    
    const { email, senha, nome, tipoUsuario } = this.formulario.value;
    
    if (this.modoLogin) {
      this.login(email, senha);
    } else {
      this.registrar(email, senha, nome, tipoUsuario);
    }
  }

  private login(email: string, senha: string) {
    this.authService.login({ email, senha }).subscribe({
      next: (usuario) => {
        this.redirecionarUsuario(usuario);
      },
      error: (erro) => {
        this.erro = 'Credenciais inválidas';
        this.carregando = false;
      }
    });
  }

  private registrar(email: string, senha: string, nome: string, tipoUsuario: number) {
    this.authService.registrar({ email, senha, nome, tipoUsuario }).subscribe({
      next: (usuario) => {
        this.redirecionarUsuario(usuario);
      },
      error: (erro) => {
        this.erro = 'Erro ao criar conta. Tente outro email.';
        this.carregando = false;
      }
    });
  }

  private redirecionarUsuario(usuario: any) {
    this.carregando = false;
    const rota = usuario.tipoUsuario === 1 ? '/nutricionista' : '/paciente';
    this.router.navigate([rota]);
  }
}