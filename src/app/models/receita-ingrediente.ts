import { Ingrediente } from "./ingrediente";
import { Receita } from "./receita";

export class ReceitaIngrediente {
    id?: number;
    receitaDTO!: Receita;
    ingredienteDTO!: Ingrediente;
    quantidade!: string;
}
