import { Component } from '@angular/core';
import { Receita } from '../../models/receita';
import { ReceitaIngredienteService } from '../../services/receita-ingrediente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaIngrediente } from '../../models/receita-ingrediente';
import { ReceitaService } from '../../services/receita.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {

  array: ReceitaIngrediente[] = [];
  receitas: Receita[] = [];

  constructor(private receitaIngredienteService: ReceitaIngredienteService, private receitaService: ReceitaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let ingrediente = this.activatedRoute.snapshot.paramMap.get('ingrediente');

    if (ingrediente) {
      // buca os relacionamentos receitas-ingredientes
      this.receitaIngredienteService.findAllByIngredienteDescricao(ingrediente).subscribe({
        next: (resultado) => {
          this.array = resultado;

          // busca as receitas encontradas
          this.array.forEach(item => {
            if (item.id)
              this.receitaService.getById(item.id).subscribe({
                next: (receita) => {
                  let objReceita = new Receita();
                  Object.assign(objReceita, receita);
                  this.receitas.push(objReceita);
                }, error: (erro) => {
                  console.warn("Erro em buscar receitas. " + erro)
                }
              });
          });

        }, error: (erro) => {
          console.warn("Erro na busca receita-ingrediente. " + erro);
        }
      });
    }
  }

  consultarReceita(id: number | undefined): void {
    console.info("consultar receita de id = " + id);
    this.router.navigate(['/consultar-receita', id]);
  }
}
