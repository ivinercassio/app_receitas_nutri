import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Nutricionista } from '../../models/nutricionista';
import { NutricionistaService } from '../../services/nutricionista.service';

@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {

  modalAberto = false;
  formGroup!: FormGroup;
  formulario!: FormGroup;
  nivelAcesso!: string;

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private pacienteService: PacienteService, private usuarioService: UsuarioService, private nutricionistaService: NutricionistaService) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
    });

    this.formGroup = this.fb.group({
      instagram: ['', Validators.required],
      emailContato: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.nivelAcesso = select.value;
  }

  salvarUsuario(): void {
    if (this.formulario.valid) {
      if (this.nivelAcesso == "NUTRICIONISTA") {
        console.log("abrir o modal agora")
        this.abrirModal();
      } else {
        // salvar usuario
        let usuario = new Usuario();
        usuario.login = this.formulario.value.login;
        usuario.senha = this.formulario.value.senha;
        usuario.nivelAcesso = this.nivelAcesso;
        this.usuarioService.save(usuario).subscribe({
          next: (usuarioSalvo) => {
            // salvar paciente
            let paciente = new Paciente();
            paciente.nome = this.formulario.value.nome;
            paciente.email = this.formulario.value.login;
            this.pacienteService.save(paciente).subscribe({
              next: (pacienteSalvo) => {
                if (pacienteSalvo.id) {
                  console.log("Paciente cadastrado com sucesso!");
                  this.router.navigate([""]); // tela de autenticacao no sistema
                }
              }
            });

          }, error: (erro) => {
            console.warn("Erro ao cadastrar usuário. ", erro);
          }
        });
      }
    } else {
      console.warn("Formulário com campos vazios ou mal preenchido.");
    }
  }

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarComModal(): void {
    // salvar usuario
    let usuario = new Usuario();
    usuario.login = this.formulario.value.login;
    usuario.senha = this.formulario.value.senha;
    usuario.nivelAcesso = this.nivelAcesso;
    this.usuarioService.save(usuario).subscribe({
      next: (usuarioSalvo) => {
        // salvar nutricionista
        let nutricionista = new Nutricionista();
        nutricionista.nome = this.formulario.value.nome;
        nutricionista.email = this.formulario.value.login;
        nutricionista.instagram = this.formGroup.value.instagram;
        nutricionista.emailContato = this.formGroup.value.emailContato;
        nutricionista.telefone = this.formGroup.value.telefone;

        console.log(nutricionista);

        this.nutricionistaService.save(nutricionista).subscribe({
          next: (nutriSalva) => {
            if (nutriSalva.id) {
              console.log("Nutricionista cadastrada com sucesso!");
              this.router.navigate([""]); // tela de autenticacao no sistema
            }
          }, error: (erro) => {
            console.warn("Erro ao cadastrar nutricionista. ", erro);
          }
        });
      }, error: (erro) => {
        console.warn("Erro ao cadastrar usuário. ", erro);
      }
    });
  }

  btnVoltar(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/buscar-receitas']);
    }
  }

}

