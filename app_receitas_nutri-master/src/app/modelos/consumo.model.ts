export interface Consumo{
    id: number;
    data: Date;
    hora: string;
    quantidade: number;
    alimentoId: number;
    usuarioId: number;
    observacao?: string; // Optional field for additional notes

}