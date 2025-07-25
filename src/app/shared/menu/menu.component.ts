import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  nivel: string = "";
  nome: string = "";

  menu = [
    // { descricao: 'Home', rota: '/#', niveis: ['ADMIN', 'NUTRICIONISTA', 'PACIENTE'] },
    { descricao: 'Buscar Receitas', rota: '/buscar-receitas', niveis: ['ADMIN', 'NUTRICIONISTA', 'PACIENTE'] },
    { descricao: 'Adicionar Receitas', rota: '/add-receitas', niveis: ['ADMIN', 'NUTRICIONISTA'] },
    { descricao: 'Favoritos', rota: '/favoritos', niveis: ['ADMIN', 'PACIENTE'] },
    { descricao: 'Consumo', rota: '/consumo', niveis: ['ADMIN', 'PACIENTE'] },
    { descricao: 'Consultar Pacientes', rota: '/consultar-pacientes', niveis: ['ADMIN', 'NUTRICIONISTA'] },
    { descricao: 'Editar Perfil', rota: '#', niveis: ['ADMIN', 'NUTRICIONISTA', 'PACIENTE'] },
  ];

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    const dados = JSON.parse(this.usuarioService.getDadosUsuario());
    if (dados) {
      try {
        this.nome = dados.nome;
      } catch (e) {
        console.warn("Erro ao fazer parse do usuário:", e);
        this.logout(); 
      }
    } else {
      console.warn("Dados de usuário não encontrados.");
      this.logout(); 
    }

    const dadosToken = this.authService.extrairDadosToken();
    if (dadosToken && dadosToken.roles) {
      // Remove "ROLE_" com a empressão regular /^ROLE_/
      this.nivel = dadosToken.roles.replace(/^ROLE_/, '');
    } else {
      console.warn('Não foi possível determinar o nível do usuário a partir do token.');
      this.logout();
    }
  }

  logout(): void {
    this.authService.limparToken();
    this.usuarioService.limparUsuario();
    this.router.navigate(['']);
  }
}
