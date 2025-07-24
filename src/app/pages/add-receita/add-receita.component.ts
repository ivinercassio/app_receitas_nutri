import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../shared/menu/menu.component';
import { Router } from '@angular/router';
import { ReceitaService } from '../../services/receita.service';
import { UsuarioService } from '../../services/usuario.service';
import { ReceitaIngrediente } from '../../models/receita-ingrediente';
import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente.service';
import { CommonModule } from '@angular/common';
import { Receita } from '../../models/receita';
import { NutricionistaService } from '../../services/nutricionista.service';
import { Nutricionista } from '../../models/nutricionista';
import { ReceitaIngredienteService } from '../../services/receita-ingrediente.service';

@Component({
  selector: 'app-add-receita',
  standalone: true,
  imports: [MenuComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-receita.component.html',
  styleUrl: './add-receita.component.css'
})
export class AddReceitaComponent {

  formulario: FormGroup;

  ingredientesSalvos: Ingrediente[] = [];
  ingredientesSelecionados: Ingrediente[] = [];
  selecionado: Ingrediente = new Ingrediente();

  array: ReceitaIngrediente[] = [];

  constructor(private fb: FormBuilder, private ingredienteService: IngredienteService, private receitaService: ReceitaService, private receitaIngredienteService: ReceitaIngredienteService, private usuarioService: UsuarioService, private nutriService: NutricionistaService, private router: Router) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      rendimento: ['', Validators.required],
      tempo: ['', Validators.required],
      preparo: ['', Validators.required],
      selecionado: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ingredienteService.findAll().subscribe({
      next: (retorno) => {
        this.ingredientesSalvos = retorno;
        console.log(this.ingredientesSalvos);
      }, error: (erro) => {
        console.warn("Erro na busca por ingredientes");
      }
    });
  }

  onSelectChange(selecionado: any): void {
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
    console.log(this.ingredientesSelecionados)
  }

  criarIngrediente(): void {
    console.log("MODAL DE CRIAR INGREDIENTE");
  }

  salvar(): void {
    if (this.formulario.valid) {
      console.log("IMPLEMENTAR O SALVAR RECEITA");
      this.salvarReceita();
    }
  }

  private salvarReceita(): void {
    let receita = this.carregarReceita();
    console.log(receita);

    this.receitaService.save(receita).subscribe({
      next: (retorno) => {
        if (retorno.id) 
          this.salvarRelacionamentos(retorno);
      }, error: (erro) => {
        console.warn("Erro ao salvar receita");
      }
    });
  }

  private salvarRelacionamentos(receita: Receita): void {
    this.array.forEach(item => {
      item.quantidade = this.formulario.get('quantidade')?.value;
      Object.assign(item.receitaDTO, receita);

      this.receitaIngredienteService.save(item).subscribe({
        next: (retorno) => {
          console.log("Salvo relacionamento id: "+ retorno.id);
        }, error: (erro) => {
          console.warn("Erro ao salvar relacionamento: " + item + "\n erro: " + erro);
        }
      });
    });

    alert("Tudo Salvo!");
    this.router.navigate(['/consultar-receita', receita.id]);
  }

  private carregarReceita(): Receita {
    let nutri = this.carregarNutricionista();
    console.log(nutri)

    let receita = new Receita();
    receita.titulo = this.formulario.get('titulo')?.value;
    receita.tempo = this.formulario.get('tempo')?.value;
    receita.rendimento = this.formulario.get('rendimento')?.value;
    receita.preparo = this.formulario.get('preparo')?.value;
    receita.horario = this.formulario.get('horario')?.value;
    receita.nutricionistaDTO = nutri;
    return receita;
  }

  private carregarNutricionista(): Nutricionista {
    var nutri: Nutricionista = new Nutricionista();
    let login = this.usuarioService.getLogin();

    this.nutriService.getByEmail(login).subscribe({
      next: (retorno) => {
        Object.assign(nutri, retorno);
      }, error: (erro) => {
        console.warn("Erro ao buscar nutricionista. " + erro);
      }
    });
    return nutri;
  }
}
