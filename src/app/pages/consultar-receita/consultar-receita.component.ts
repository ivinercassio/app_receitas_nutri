import { Component } from '@angular/core';
import { Receita } from '../../models/receita';
import { Ingrediente } from '../../models/ingrediente';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../../services/receita.service';
import { ReceitaIngredienteService } from '../../services/receita-ingrediente.service';
import { ReceitaIngrediente } from '../../models/receita-ingrediente';
import { CommonModule } from '@angular/common';
import { IngredienteService } from '../../services/ingrediente.service';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-consultar-receita',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './consultar-receita.component.html',
  styleUrl: './consultar-receita.component.css'
})
export class ConsultarReceitaComponent {
  receita: Receita = new Receita();
  array: ReceitaIngrediente[] = [];
  ingredientes: Ingrediente[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private receitaService: ReceitaService, private receitaIngredienteService: ReceitaIngredienteService, private ingredienteService: IngredienteService) { }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      // carrega a receita
      this.receitaService.getById(id).subscribe({
        next: (receita) => {
          Object.assign(this.receita, receita);

          // buscar todos os relacionamentos atraves do id da receita
          if (this.receita.id) {
            this.receitaIngredienteService.findAllByReceitaId(this.receita.id).subscribe({
              next: (resposta) => {
                this.array = resposta;

                // busca todos os ingredientes da receita
                this.array.forEach(item => {
                  this.ingredientes.push(item.ingredienteDTO);                  
                });
                console.log(this.ingredientes);

              }, error: (erro) => {
                console.warn("Erro na busca por receitas-ingredientes. " + erro);
              }
            });
          }

        }, error: (erro) => {
          console.warn("Erro na busca por receita. " + erro);
        }
      });
    }
  }
}
