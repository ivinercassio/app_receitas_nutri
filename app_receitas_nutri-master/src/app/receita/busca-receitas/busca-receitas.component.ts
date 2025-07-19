import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-busca-receitas',
  templateUrl: './busca-receitas.component.html',
  styleUrls: ['./busca-receitas.component.scss']
})
export class BuscaReceitasComponent {
  termoBusca: string = '';
  @Output() busca = new EventEmitter<string>();

  pesquisar() {
    this.busca.emit(this.termoBusca);
  }
}