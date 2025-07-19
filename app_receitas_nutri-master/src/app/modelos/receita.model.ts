export interface Receita {
    idReceita: number;
    titulo: string;
    ingredientes: Ingrediente[];
    horario: 'café' | 'almoço' | 'jantar';
  }
  
  export interface Ingrediente {
    idIngrediente: number;
    descricao: string;
    quantidade: number;
  }