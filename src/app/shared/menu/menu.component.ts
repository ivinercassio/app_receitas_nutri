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
    { descricao: 'Home', rota: '/#', niveis: ['ADMIN', 'NUTRICIONISTA', 'PACIENTE'] },
    { descricao: 'Buscar Receitas', rota: '/buscar-receitas', niveis: ['ADMIN', 'NUTRICIONISTA', 'PACIENTE'] },
    { descricao: 'Adicionar Receitas', rota: '/add-receitas', niveis: ['ADMIN', 'NUTRICIONISTA'] },
    { descricao: 'Consumo', rota: '#', niveis: ['ADMIN', 'PACIENTE'] },
    { descricao: 'Editar Perfil', rota: '#', niveis: ['ADMIN', 'NUTRICIONISTA', 'PACIENTE'] },
  ];

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.nome = this.usuarioService.getUsuarioNome();
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
