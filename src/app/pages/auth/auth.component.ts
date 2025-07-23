import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
      this.authService.authentication(objLogin).subscribe({
        next: (resultado) => {
          console.info("Usuário logado: " + resultado);
          this.authService.salvarToken(resultado);
          this.router.navigate(['buscar-receitas']);
        }, error: (erro) => {
          console.warn("Usuário ou senha inválido: " + erro)
        }
      });
    } else {
      this.formulario.get("login")?.setValue("");
      this.formulario.get("senha")?.setValue("");
    }
  }
}
