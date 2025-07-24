import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-buscar-receitas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MenuComponent],
  templateUrl: './buscar-receitas.component.html',
  styleUrl: './buscar-receitas.component.css'
})
export class BuscarReceitasComponent {

  ingrediente: string = "";
  // array: string[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onEnter(event: any): void {
    this.buscar();
    // const text = event.target.value;
    // this.array.push(text);
    // this.ingrediente = "";
    // console.log(this.array);
  }

  // removerIngrediente(texto: string): void {
  //   this.array = this.array.filter(ingrediente => ingrediente.valueOf() != texto);
  //   console.log("ingrediente removido: " + this.array);
  // }

  buscar(): void {
    if (this.ingrediente != "")
      this.router.navigate(["/resultados", this.ingrediente]);
  }
}
