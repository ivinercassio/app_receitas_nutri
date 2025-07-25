import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { Receita } from '../../models/receita';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ReceitaService } from '../../services/receita.service';
import { PacienteReceitaService } from '../../services/paciente-receita.service';
import { PacienteReceita } from '../../models/paciente-receita';

@Component({
  selector: 'app-consumo',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './consumo.component.html',
  styleUrl: './consumo.component.css'
})
export class ConsumoComponent {

  array: PacienteReceita[] = [];
  receitas: Receita[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService, private pacienteReceitaService: PacienteReceitaService, private receitaService: ReceitaService) { }

  ngOnInit(): void {
    const dados = JSON.parse(this.usuarioService.getDadosUsuario());
    let id: number;
    if (dados) {
      id = dados.id;
      try {
        // todos os paciente-receita do paciente
        this.pacienteReceitaService.findByPacienteId(dados.id).subscribe({
          next: (list) => {
            this.array = list.filter(item => item.idPaciente == id);

            list.forEach(item => {
              this.receitaService.getById(item.idReceita).subscribe({
                next: (receita) => {
                  let objeto = new Receita();
                  Object.assign(objeto, receita)
                  this.receitas.push(objeto);
                }
              });
            });

          }
        });
      } catch (e) {
        console.warn("Erro ao fazer parse do usuário:", e);
      }
    } else {
      console.warn("Dados de usuário não encontrados.");
    }

  }

  consultarReceita(id: number | undefined): void {
    this.router.navigate(['/consultar-receita', id]);
  }
}
