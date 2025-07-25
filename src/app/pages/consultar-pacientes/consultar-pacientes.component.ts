import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ReceitaService } from '../../services/receita.service';
import { PacienteReceitaService } from '../../services/paciente-receita.service';
import { Router } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { Receita } from '../../models/receita';
import { PacienteService } from '../../services/paciente.service';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-pacientes',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './consultar-pacientes.component.html',
  styleUrl: './consultar-pacientes.component.css'
})
export class ConsultarPacientesComponent {

  pacientes: Paciente[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService, private pacienteReceitaService: PacienteReceitaService, private receitaService: ReceitaService, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    const dados = JSON.parse(this.usuarioService.getDadosUsuario());
    let id;
    if (dados) {
      try {
        id = dados.id;
        // buscar todos os pacientes- receitas
        this.pacienteReceitaService.findAll().subscribe({
          next: (list) => {

            if (list.length > 0) {
              // buscar cada receita do relacionamento
              list.forEach(item => {
                this.receitaService.getById(item.idReceita).subscribe({
                  next: (receita) => {
                    let objeto = new Receita();
                    Object.assign(objeto, receita)

                    // pra cada receita comparar se eh da nutri
                    if (objeto.idNutricionista == id!) {
                      this.pacienteService.getById(item.idPaciente).subscribe({
                        next: (paciente) => {
                          let objeto = new Paciente();
                          Object.assign(objeto, paciente);
                          this.pacientes.push(objeto);
                        }
                      });
                    }

                  }
                });
              });
            }

          }, error: (erro) => {
            console.warn("Erro ao buscar pacientes-receitas " + erro);
          }
        });
      } catch (e) {
        console.warn("Erro ao fazer parse do usuário:", e);
      }
    } else {
      console.warn("Dados de usuário não encontrados.");
    }

  }

  consultarConsumo(id: number | undefined): void {
    this.router.navigate(['/consumo', id]);
  }
}
