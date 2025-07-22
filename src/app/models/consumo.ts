import { Paciente } from "./paciente";

export class Consumo {
    id?: number;
    paciente!: Paciente;
    dataHora!: string;
}
