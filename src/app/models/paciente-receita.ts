import { Paciente } from "./paciente";
import { Receita } from "./receita";

export class PacienteReceita {
    id?: number;
    paciente!: Paciente;
    receita!: Receita;
    dataFavoritacao!: string;
}
