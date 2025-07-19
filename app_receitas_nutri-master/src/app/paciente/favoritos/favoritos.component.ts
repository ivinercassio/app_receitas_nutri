import { Component, OnInit } from '@angular/core';
import { ReceitaService } from '../../servicos/receita.service';
import { Favorito } from '../../modelos/favorito.model';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  favoritos: Favorito[] = [];
  carregando = true;

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  carregarFavoritos() {
    this.receitaService.getFavoritos().subscribe({
      next: (favoritos) => {
        this.favoritos = favoritos;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        alert('Erro ao carregar favoritos');
      }
    });
  }

  removerFavorito(id: number) {
    this.receitaService.removerFavorito(id).subscribe({
      next: () => {
        this.favoritos = this.favoritos.filter(f => f.idUsuarioReceita !== id);
      },
      error: () => alert('Erro ao remover favorito')
    });
  }
}