import { Component } from '@angular/core';
import { Receita } from '../../models/receita';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { PacienteReceitaService } from '../../services/paciente-receita.service';
import { ReceitaService } from '../../services/receita.service';
import { PacienteReceita } from '../../models/paciente-receita';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  
  array: PacienteReceita[] = [];
  receitas: Receita[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService, private pacienteReceitaService: PacienteReceitaService, private receitaService: ReceitaService) { }

  ngOnInit(): void {
    const dados = JSON.parse(this.usuarioService.getDadosUsuario());
    let id;
    if (dados) {
      try {
        this.pacienteReceitaService.findByPacienteId(dados.id).subscribe({
          next: (list) => {
            this.array = list;

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
