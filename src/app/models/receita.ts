export class Receita {
    id?: number;
    idNutricionista!: number;
    titulo!: string;
    rendimento!: number;
    tempo!: number;
    preparo!: string;
    horario!: 'CAFE_DA_MANHA' | 'LANCHE' | 'ALMOCO' | 'JANTA';
    // foto?: string;
}
