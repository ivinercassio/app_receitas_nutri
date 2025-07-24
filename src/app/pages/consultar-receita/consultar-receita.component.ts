import { Component } from '@angular/core';
import { Receita } from '../../models/receita';
import { Ingrediente } from '../../models/ingrediente';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../../services/receita.service';
import { ReceitaIngredienteService } from '../../services/receita-ingrediente.service';
import { ReceitaIngrediente } from '../../models/receita-ingrediente';
import { CommonModule, DatePipe } from '@angular/common';
import { IngredienteService } from '../../services/ingrediente.service';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AuthService } from '../../services/auth.service';
import { PacienteReceitaService } from '../../services/paciente-receita.service';
import { PacienteReceita } from '../../models/paciente-receita';
import { Paciente } from '../../models/paciente';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-consultar-receita',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './consultar-receita.component.html',
  styleUrl: './consultar-receita.component.css'
})
export class ConsultarReceitaComponent {

  nivel: string = "";
  receita: Receita = new Receita();
  array: ReceitaIngrediente[] = [];
  ingredientes: Ingrediente[] = [];

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private receitaService: ReceitaService, private receitaIngredienteService: ReceitaIngredienteService, private pacienteReceitaService: PacienteReceitaService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const dadosToken = this.authService.extrairDadosToken();
    if (dadosToken && dadosToken.roles) 
      // Remove "ROLE_" com a empressão regular /^ROLE_/
      this.nivel = dadosToken.roles.replace(/^ROLE_/, '');

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

  public favoritar(): void {
    // add paciente receita
    
    let relacionamento = new PacienteReceita();
    relacionamento.dataFavoritacao = new Date().toDateString();
    relacionamento.receitaDTO = this.receita;
    let retorno = this.usuarioService.getUsuario();
    if (retorno != undefined)
      relacionamento.pacienteDTO = retorno;
    console.log(relacionamento);
    
    this.pacienteReceitaService.save(relacionamento).subscribe({
      next: (retorno) => {
        if (retorno.id) {
          document.getElementById('favoritar')?.setAttribute('class', 'disabled');
          alert("Adicionados nos Favoritos!");
        }
      }, error: (erro) => {
        console.warn("Erro ao salvar receita-paciente. " + erro);
      }
    });

  }

  public registrarConsumo(): void {

  }
}
