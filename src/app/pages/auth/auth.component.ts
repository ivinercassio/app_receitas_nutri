import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Token } from '../../models/token';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formulario = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  entrar(): void {
    let objLogin = new Login();
    objLogin = this.formulario.value;

    if (this.formulario.valid) {
      this.authService.authentication(objLogin).subscribe(resultado => {
        console.info("Usuário logado");
        console.log(resultado);

        // let token = new Token();
        // token = resultado; // erro na conversao para tipo Token

        this.salvarToken(resultado);
        this.router.navigate(['buscar-receitas']);
      }, erro => {
        console.warn("Usuário ou senha inválido.")
        console.error(erro);
      });
    } else {
      this.formulario.get("login")?.setValue("");
      this.formulario.get("senha")?.setValue("");
    }
  }

  salvarToken(token: any) {
    localStorage.setItem("Token", JSON.stringify(token));
  }
}
