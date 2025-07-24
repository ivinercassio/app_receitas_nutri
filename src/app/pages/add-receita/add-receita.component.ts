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
  nutricionistaDTO!: Nutricionista;

  ingredientesSalvos: Ingrediente[] = [];
  ingredientesSelecionados: Ingrediente[] = [];
  selecionado: Ingrediente = new Ingrediente();

  array: ReceitaIngrediente[] = [];

  constructor(private fb: FormBuilder, private ingredienteService: IngredienteService, private receitaService: ReceitaService, private receitaIngredienteService: ReceitaIngredienteService, private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) {
    this.formulario = this.fb.group({
      id: [null],
      nutricionistaDTO: [null],
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
    this.nutricionistaDTO = new Nutricionista();


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
      this.novoRelacionamento(selecionado);
      this.ingredientesSelecionados.push(selecionado);
    }
  }

  novoRelacionamento(ingrediente: Ingrediente) {
    if (ingrediente != null) {
      let novo = new ReceitaIngrediente();
      novo.ingredienteDTO = ingrediente;
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
    if (this.formulario.valid)
      this.salvarReceita();
  }

  private salvarReceita(): void {
    let receita = this.carregarReceita();
    console.log(JSON.stringify(receita));

    this.receitaService.save(receita).subscribe({
      next: (retorno) => {
        if (retorno.id)
          this.salvarRelacionamentos(retorno);
      }, error: (erro) => {
        console.warn("Erro ao salvar receita" + erro);
      }
    });
  }

  private salvarRelacionamentos(receita: Receita): void {
    this.array.forEach(item => {
      item.quantidade = this.formulario.get('quantidade')?.value;
      Object.assign(item.receitaDTO, receita);

      this.receitaIngredienteService.save(item).subscribe({
        next: (retorno) => {
          console.log("Salvo relacionamento id: " + retorno.id);
        }, error: (erro) => {
          console.warn("Erro ao salvar relacionamento: " + item + "\n erro: " + erro);
        }
      });
    });

    alert("Tudo Salvo!");
    this.router.navigate(['/consultar-receita', receita.id]);
  }

  private carregarReceita(): Receita {
    let retorno = this.usuarioService.getUsuario();
    if (this.formulario.valid && retorno != undefined) {
      this.receita = this.formulario.value;
      this.receita.nutricionistaDTO = Object.assign({}, retorno);
    }
    return this.receita;
  }
}
