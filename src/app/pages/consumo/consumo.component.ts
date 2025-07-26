import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { Receita } from '../../models/receita';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ReceitaService } from '../../services/receita.service';
import { PacienteReceitaService } from '../../services/paciente-receita.service';
import { PacienteReceita } from '../../models/paciente-receita';
import { ConsumoService } from '../../services/consumo.service';
import { Consumo } from '../../models/consumo';

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
  listConsumo: Consumo[] = [];

  idReceitaTemp: number = -1;

  constructor(private router: Router, private usuarioService: UsuarioService, private pacienteReceitaService: PacienteReceitaService, private receitaService: ReceitaService, private consumoService: ConsumoService) { }

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
              // buscar os consumos atraves dos idPacienteReceita
              this.consumoService.findAll().subscribe({
                next: (listConsumo) => {
                  this.listConsumo = listConsumo.filter(consumo => consumo.idPacienteReceita == item.id);
                }
              });

              // busca cada receita do relacionamento paciente-receita
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

  tituloReceita(idConsumo: number | undefined, data: string): string {
    if (!idConsumo || !data)
      return "";
    const consumo = this.listConsumo.find(item => item.id == idConsumo && item.dataHora == data);
    const relacionamento = this.array.find(item => item.id == consumo?.idPacienteReceita);
    const receita = this.receitas.find(item => item.id == relacionamento?.idReceita);
    if (receita?.id) {
      this.idReceitaTemp = receita.id!;
      return receita.titulo;
    }
    return "";
  }

  horarioReceita(): string {
    let receita = this.receitas.find(item => item.id == this.idReceitaTemp);
    if (receita)
      return receita.horario;
    return "";
  }

  consultarReceita(id: number | undefined): void {
    this.router.navigate(['/consultar-receita', id]);
  }
}
