import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Paciente } from '../../models/paciente';
import { Nutricionista } from '../../models/nutricionista';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  usuario: Usuario = new Usuario();
  paciente: Paciente = new Paciente();
  nutricionista: Nutricionista = new Nutricionista();
}
