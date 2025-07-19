import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceitaService } from '../../servicos/receita.service';
import { IngredienteService } from '../../servicos/ingrediente.service';
import { Ingrediente } from '../../modelos/ingrediente.model';
import { Receita } from '../../modelos/receita.model';

@Component({
  selector: 'app-formulario-receita',
  templateUrl: './formulario-receita.component.html',
  styleUrls: ['./formulario-receita.component.scss']
})
export class FormularioReceitaComponent implements OnInit {
  formulario: FormGroup;
  ingredientes: Ingrediente[] = [];
  carregandoIngredientes = true;
  modoEdicao = false;
  receitaId?: number;

  constructor(
    private fb: FormBuilder,
    private receitaService: ReceitaService,
    private ingredienteService: IngredienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      horario: ['Café da manhã', Validators.required],
      tempo: [30, [Validators.required, Validators.min(1)]],
      rendimento: [2, [Validators.required, Validators.min(1)]],
      preparo: ['', Validators.required],
      ingredientes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.carregarIngredientes();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.receitaId = +id;
      this.carregarReceita(+id);
    } else {
      this.adicionarIngrediente();
    }
  }

  get ingredientesForm(): FormArray {
    return this.formulario.get('ingredientes') as FormArray;
  }

  carregarIngredientes() {
    this.ingredienteService.getIngredientes().subscribe({
      next: (ingredientes) => {
        this.ingredientes = ingredientes;
        this.carregandoIngredientes = false;
      },
      error: () => {
        this.carregandoIngredientes = false;
        alert('Erro ao carregar ingredientes');
      }
    });
  }

  carregarReceita(id: number) {
    this.receitaService.getReceitaPorId(id).subscribe({
      next: (receita) => {
        this.formulario.patchValue({
          titulo: receita.titulo,
          horario: receita.horario,
          tempo: receita.tempo,
          rendimento: receita.rendimento,
          preparo: receita.preparo
        });
        
        receita.ingredientes?.forEach(ing => {
          this.ingredientesForm.push(this.fb.group({
            idIngrediente: [ing.ingrediente.idIngrediente, Validators.required],
            quantidade: [ing.quantidade, [Validators.required, Validators.min(0.1)]]
          }));
        });
      },
      error: () => alert('Erro ao carregar receita')
    });
  }

  adicionarIngrediente() {
    this.ingredientesForm.push(this.fb.group({
      idIngrediente: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(0.1)]]
    }));
  }

  removerIngrediente(index: number) {
    this.ingredientesForm.removeAt(index);
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const receita: Receita = this.formulario.value;
    
    if (this.modoEdicao && this.receitaId) {
      this.receitaService.atualizarReceita(this.receitaId, receita).subscribe({
        next: () => {
          alert('Receita atualizada com sucesso!');
          this.router.navigate(['/receitas', this.receitaId]);
        },
        error: () => alert('Erro ao atualizar receita')
      });
    } else {
      this.receitaService.criarReceita(receita).subscribe({
        next: (novaReceita) => {
          alert('Receita criada com sucesso!');
          this.router.navigate(['/receitas', novaReceita.idReceita]);
        },
        error: () => alert('Erro ao criar receita')
      });
    }
  }
}
