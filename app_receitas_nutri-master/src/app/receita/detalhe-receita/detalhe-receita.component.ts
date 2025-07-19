import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceitaService } from '../../servicos/receita.service';
import { Receita } from '../../modelos/receita.model';
import { FavoritoService } from '../../servicos/favorito.service';

@Component({
  selector: 'app-detalhe-receita',
  templateUrl: './detalhe-receita.component.html',
  styleUrls: ['./detalhe-receita.component.scss']
})
export class DetalheReceitaComponent implements OnInit {
  receita?: Receita;
  carregando = true;
  ehFavorita = false;

  constructor(
    private route: ActivatedRoute,
    private receitaService: ReceitaService,
    private favoritoService: FavoritoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarReceita(+id);
      this.verificarFavorita(+id);
    }
  }

  carregarReceita(id: number) {
    this.receitaService.getReceitaPorId(id).subscribe({
      next: (receita) => {
        this.receita = receita;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        alert('Erro ao carregar receita');
      }
    });
  }

  verificarFavorita(idReceita: number) {
    this.favoritoService.isFavorita(idReceita).subscribe({
      next: (ehFavorita) => this.ehFavorita = ehFavorita
    });
  }

  toggleFavorito() {
    if (!this.receita) return;

    if (this.ehFavorita) {
      this.favoritoService.removerFavorito(this.receita.idReceita).subscribe({
        next: () => this.ehFavorita = false
      });
    } else {
      this.favoritoService.adicionarFavorito(this.receita.idReceita).subscribe({
        next: () => this.ehFavorita = true
      });
    }
  }

  marcarComoFeita() {
    if (!this.receita) return;
    
    this.receitaService.registrarConsumo(this.receita.idReceita).subscribe({
      next: () => alert('Receita registrada com sucesso!'),
      error: () => alert('Erro ao registrar consumo')
    });
  }
}
