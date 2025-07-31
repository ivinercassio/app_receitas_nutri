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
import { Consumo } from '../../models/consumo';
import { ConsumoService } from '../../services/consumo.service';

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

  pacienteReceita!: PacienteReceita;
  btnFavoritar: boolean = false;
  btnDesabilitarDesfavoritar: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private receitaService: ReceitaService, private receitaIngredienteService: ReceitaIngredienteService, private pacienteReceitaService: PacienteReceitaService, private usuarioService: UsuarioService, private ingredienteService: IngredienteService, private consumoService: ConsumoService, private router: Router) { }

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
                  this.ingredienteService.getById(item.idIngrediente).subscribe({
                    next: (retorno) => {
                      let ingrediente = new Ingrediente();
                      Object.assign(ingrediente, retorno);
                      this.ingredientes.push(ingrediente);
                    }, error: () => {
                      console.warn("Erro ao carregar ingrediente de id " + item.idIngrediente);
                    }
                  });
                });

                this.verificarFavoritado();
              }, error: (erro) => {
                console.warn("Erro na busca por receitas-ingredientes. " + erro);
              }
            });
          }

        }, error: (erro) => {
          alert("Erro na busca por receita. " + erro);
          this.router.navigate(['/buscar-receitas']);
        }
      });

    }
  }

  private verificarFavoritado(): void {
    var idPaciente: number;
    const dados = JSON.parse(this.usuarioService.getDadosUsuario());
    if (dados) {
      try {
        idPaciente = dados.id;
      } catch (e) {
        console.warn("Erro ao fazer parse do usuário:", e);
      }
    } else {
      console.warn("Dados de usuário não encontrados.");
    }

    this.pacienteReceitaService.findAll().subscribe({
      next: (list) => {
        if (list[0] != null) {
          let relacionamento = list.filter(item => item.idReceita == this.receita.id && item.idPaciente == idPaciente!);
          this.pacienteReceita = new PacienteReceita();
          if (relacionamento[0] != null) {
            Object.assign(this.pacienteReceita, relacionamento[0]);
            this.btnFavoritar = false;
          } else {
            this.pacienteReceita.idPaciente = idPaciente;
            this.btnFavoritar = true;
          }
        }
      }, error: (erro) => {
        console.warn("Erro ao salvar receita-paciente. " + erro);
      }
    });
  }

  public favoritar(): void {
    let relacionamento = new PacienteReceita();
    relacionamento.dataFavoritacao = new Date().toDateString();
    relacionamento.idReceita = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    const dados = JSON.parse(this.usuarioService.getDadosUsuario());
    if (dados) {
      try {
        relacionamento.idPaciente = dados.id;
      } catch (e) {
        console.warn("Erro ao fazer parse do usuário:", e);
      }
    } else {
      console.warn("Dados de usuário não encontrados.");
    }

    console.log(relacionamento);

    this.pacienteReceitaService.save(relacionamento).subscribe({
      next: (retorno) => {
        if (retorno.id) {
          this.pacienteReceita = new PacienteReceita();
          Object.assign(this.pacienteReceita, retorno);
          this.btnFavoritar = false;
        }
      }, error: (erro) => {
        console.warn("Erro ao salvar receita-paciente. " + erro);
      }
    });
  }

  public desfavoritar(): void {
    this.verificarFavoritado();

    this.pacienteReceitaService.deleteById(this.pacienteReceita.id!).subscribe({
      next: () => {
        this.btnFavoritar = true;

      }, error: (erro) => {
        console.warn("Erro ao deletar receita-paciente. " + erro);
        alert("Consumo já registrado. BD barra desfavoritar!");
        this.btnDesabilitarDesfavoritar = true;
      }
    });
  }

  public registrarConsumo(): void {
    if (this.btnFavoritar) return;
    let consumo = new Consumo();
    consumo.dataHora = String(new Date());
    consumo.idPacienteReceita = this.pacienteReceita.id!;

    this.consumoService.save(consumo).subscribe({
      next: (retorno) => {
        if (retorno.id) {
          alert("Consumo registrado!");
        }
      }, error: (erro) => {
        console.warn("Erro ao salvar receita-paciente. " + erro);
      }
    });
  }

  public editar(): void {
    this.router.navigate(["/add-receitas", this.receita.id]);
  }

  // public excluir(): void {
  //   this.receitaIngredienteService.findAllByReceitaId(this.receita.id!).subscribe({
  //     next: (array) => {

  //       array.forEach(item => {
  //         this.receitaIngredienteService.deleteById(item.id!).subscribe({
  //           error: (erro) => {
  //             console.warn("Erro ao deletar receita-ingrediente. " + erro);
  //           }
  //         });
  //       });

  //       this.receita.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  //       this.receitaService.deleteById(this.receita.id).subscribe({
  //         next: () => {
  //           this.router.navigate(["/buscar-receitas"]);
  //         }, error: (erro) => {
  //           console.warn("Erro ao deletar receita. " + erro);
  //           // alert("BD nao deixou apagar. Existe relacionamento");
  //         }
  //       });

  //     }, error: (erro) => {
  //       console.warn("Erro ao buscar receita-ingrediente. " + erro);
  //     }
  //   });
  // }
}
