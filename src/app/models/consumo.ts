import { Paciente } from "./paciente";

export class Consumo {
    id?: number;
    pacienteDTO!: Paciente;
    dataHora!: string;
}
