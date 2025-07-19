import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  destaques = [
    {
      titulo: 'Receitas Saudáveis',
      descricao: 'Descubra opções deliciosas e nutritivas',
      cor: 'bg-primary'
    },
    {
      titulo: 'Acompanhamento Nutricional',
      descricao: 'Monitore seu progresso de forma simples',
      cor: 'bg-success'
    },
    {
      titulo: 'Profissionais Especializados',
      descricao: 'Conte com orientação de nutricionistas',
      cor: 'bg-info'
    }
  ];
}