import { Component, OnInit } from '@angular/core';
import { ReceitaService } from '../../servicos/receita.service';
import { Consumo } from '../../modelos/consumo.model';

@Component({
  selector: 'app-minhas-receitas',
  templateUrl: './minhas-receitas.component.html',
  styleUrls: ['./minhas-receitas.component.scss']
})
export class MinhasReceitasComponent implements OnInit {
  historico: Consumo[] = [];
  carregando = true;

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.carregarHistorico();
  }

  carregarHistorico() {
    this.receitaService.getHistoricoConsumo().subscribe({
      next: (historico) => {
        this.historico = historico;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        alert('Erro ao carregar histórico');
      }
    });
  }
}