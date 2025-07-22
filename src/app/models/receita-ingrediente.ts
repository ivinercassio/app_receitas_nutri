import { Ingrediente } from "./ingrediente";
import { Receita } from "./receita";

export class ReceitaIngrediente {
    id?: number;
    receita!: Receita;
    ingrediente!: Ingrediente;
    quantidade!: string;
}
