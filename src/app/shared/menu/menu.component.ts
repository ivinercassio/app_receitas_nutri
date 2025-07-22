import { Component } from '@angular/core';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent {
  usuario?: Usuario;

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) {
    this.authService.usuarioAtual.subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
