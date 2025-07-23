import { Nutricionista } from "./nutricionista";

export class Receita {
    id?: number;
    nutricionistaDTO!: Nutricionista;
    titulo!: string;
    rendimento!: number;
    tempo!: number;
    preparo!: string;
    horario!: 'CAFE_DA_MANHA' | 'LANCHE' | 'ALMOCO' | 'JANTA';
    foto?: string;
}
