import { Component, OnInit } from '@angular/core';
import { DadosNutricionaisService } from '../../servicos/dados-nutricionais.service';
import { RelatorioNutricional } from '../../modelos/relatorio-nutricional.model';

@Component({
  selector: 'app-minha-nutricao',
  templateUrl: './minha-nutricao.component.html',
  styleUrls: ['./minha-nutricao.component.scss']
})
export class MinhaNutricaoComponent implements OnInit {
  relatorio?: RelatorioNutricional;
  carregando = true;
  periodo = 'semana';

  constructor(private dadosService: DadosNutricionaisService) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.carregando = true;
    this.dadosService.getRelatorioPaciente(this.periodo).subscribe({
      next: (relatorio) => {
        this.relatorio = relatorio;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        alert('Erro ao carregar dados nutricionais');
      }
    });
  }

  mudarPeriodo(novoPeriodo: string) {
    this.periodo = novoPeriodo;
    this.carregarDados();
  }
}
