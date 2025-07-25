import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../shared/menu/menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../../services/receita.service';
import { UsuarioService } from '../../services/usuario.service';
import { ReceitaIngrediente } from '../../models/receita-ingrediente';
import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente.service';
import { CommonModule } from '@angular/common';
import { Receita } from '../../models/receita';
import { ReceitaIngredienteService } from '../../services/receita-ingrediente.service';
import { Nutricionista } from '../../models/nutricionista';

@Component({
  selector: 'app-add-receita',
  standalone: true,
  imports: [MenuComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-receita.component.html',
  styleUrl: './add-receita.component.css'
})
export class AddReceitaComponent {

  formulario: FormGroup;
  receita!: Receita;

  ingredientesSalvos: Ingrediente[] = [];
  ingredientesSelecionados: Ingrediente[] = [];
  selecionado: Ingrediente = new Ingrediente();

  array: ReceitaIngrediente[] = [];

  constructor(private fb: FormBuilder, private ingredienteService: IngredienteService, private receitaService: ReceitaService, private receitaIngredienteService: ReceitaIngredienteService, private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) {
    this.formulario = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      rendimento: ['', Validators.required],
      tempo: ['', Validators.required],
      preparo: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.receita = new Receita();
    if (id) {
      // carregando receita para editacao 
      this.receitaService.getById(id).subscribe({
        next: (retorno) => {
          Object.assign(this.receita, retorno);
        }, error: (erro) => {
          console.warn("Erro ao carregar receita" + erro);
        }
      });

      this.receitaIngredienteService.findAllByReceitaId(id).subscribe({
        next: (retorno) => {
          this.array = retorno;
          if (this.array[0] != null) {

            this.array.forEach(item => {
              this.ingredienteService.getById(item.idIngrediente).subscribe({
                next: (ingrediente) => {
                  let objeto = new Ingrediente();
                  Object.assign(objeto, ingrediente);
                  this.ingredientesSelecionados.push(objeto);
                }, error: (erro) => {
                  console.log("Erro ao carregar ingrediente de id " + item.idIngrediente);
                }
              });
            });

          }
        }, error: (erro) => {
          console.log("Erro ao carregar ingrediente-receita. " + erro);
        }
      });
    }

    this.ingredienteService.findAll().subscribe({
      next: (retorno) => {
        this.ingredientesSalvos = retorno;
      }, error: (erro) => {
        console.warn("Erro na busca por ingredientes" + erro);
      }
    });
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const index = select.selectedIndex;
    const selecionado = this.ingredientesSalvos[index - 1];

    // listar ingrediente selcionado
    if (!this.ingredientesSelecionados.includes(selecionado)) {
      this.novoRelacionamento(selecionado.id!);
      this.ingredientesSelecionados.push(selecionado);
    }
  }

  novoRelacionamento(id: number) {
    if (id != null) {
      let novo = new ReceitaIngrediente();
      novo.idIngrediente = id;
      novo.quantidade = "1";
      this.array.push(novo);
    }
  }

  removerIngrediente(id: number | undefined) {
    if (id)
      this.ingredientesSelecionados = this.ingredientesSelecionados.filter(item => item.id != id);
  }

  criarIngrediente(): void {
    console.log("MODAL DE CRIAR INGREDIENTE");
  }

  salvar(): void {
    if (this.formulario.valid || this.receita.id) 
      this.salvarReceita();
  }

  private salvarReceita(): void {
    let receita = this.carregarReceita();

    this.receitaService.save(receita).subscribe({
      next: (retorno) => {
        if (retorno.id) {
          this.salvarRelacionamentos(retorno.id);
          this.router.navigate(['/consultar-receita', retorno.id]);
        }
      }, error: (erro) => {
        console.warn("Erro ao salvar receita" + erro);
      }
    });
  }

  private salvarRelacionamentos(id: number): void {
    this.array.forEach((item, index) => {
      item.idReceita = id;
      // console.warn(this.array[]);
      // item.quantidade = document.getElementById(`${this.array[index].id}`)?.getAttribute("value")!;
      this.receitaIngredienteService.save(item).subscribe({
        error: (erro) => {
          console.warn("Erro ao salvar relacionamento: " + item + "\n erro: " + erro + "\n quantidade: " + document.getElementById(`${this.array[index].id}`)?.getAttribute("value"));
        }
      });
    });
    // if (this.receita.id) { // caso edicao
    //   console.log("entrei")
    //   this.

    // } else { // caso criacao
    // }
  }

  private carregarReceita(): Receita {
    if (this.formulario.valid) {
      this.receita = this.formulario.value;
      this.receita.idNutricionista = JSON.parse(this.usuarioService.getDadosUsuario()).id;
    }
    return this.receita;
  }
}
