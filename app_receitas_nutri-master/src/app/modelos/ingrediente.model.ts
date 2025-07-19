export interface Ingrediente {
  idIngrediente: number;
  descricao: string;
  calorias: number; // Por unidade de medida (ex: por 100g)
  foto?: string; // Base64 ou URL
  unidadeMedida: 'g' | 'ml' | 'unidade' | 'colher';
}