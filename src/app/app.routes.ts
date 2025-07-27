import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { BuscarReceitasComponent } from './pages/buscar-receitas/buscar-receitas.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ConsultarReceitaComponent } from './pages/consultar-receita/consultar-receita.component';
import { AddReceitaComponent } from './pages/add-receita/add-receita.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ConsultarPacientesComponent } from './pages/consultar-pacientes/consultar-pacientes.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { AddUsuarioComponent } from './pages/add-usuario/add-usuario.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'add-usuario', component: AddUsuarioComponent },
    { path: 'buscar-receitas', component: BuscarReceitasComponent },
    { path: 'add-receitas', component: AddReceitaComponent },
    { path: 'add-receitas/:id', component: AddReceitaComponent },
    { path: 'consultar-pacientes', component: ConsultarPacientesComponent },
    { path: 'consumo', component: ConsumoComponent },
    { path: 'consumo/:id', component: ConsumoComponent },
    { path: 'resultados/:ingrediente', component: ResultadosComponent },
    { path: 'consultar-receita/:id', component: ConsultarReceitaComponent },
    { path: 'favoritos', component: FavoritosComponent },
];
