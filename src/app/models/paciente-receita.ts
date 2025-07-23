import { Paciente } from "./paciente";
import { Receita } from "./receita";

export class PacienteReceita {
    id?: number;
    pacienteDTO!: Paciente;
    receitaDTO!: Receita;
    dataFavoritacao!: string;
}
