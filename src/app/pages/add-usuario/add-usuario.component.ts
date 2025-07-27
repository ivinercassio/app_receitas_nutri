import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      instagram: ['']
    });

    this.formGroup = this.fb.group({
      instagram: ['', Validators.required],
      emailContato: ['', Validators.required, Validators.email],
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
        // salvar paciente
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
    if (this.formGroup.valid) {
      // salvar usuario
      // salvar nutricionista
    }
  }

}

