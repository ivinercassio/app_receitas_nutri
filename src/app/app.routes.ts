import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { BuscarReceitasComponent } from './pages/buscar-receitas/buscar-receitas.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ConsultarReceitaComponent } from './pages/consultar-receita/consultar-receita.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'buscar-receitas', component: BuscarReceitasComponent },
    { path: 'resultados/:ingrediente', component: ResultadosComponent },
    { path: 'consultar-receita/:id', component: ConsultarReceitaComponent },
];
