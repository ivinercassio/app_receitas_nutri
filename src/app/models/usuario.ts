export class Usuario {
    id?: number;
    login!: string;
    senha!: string;
    nivelAcesso!: string; // 'ADM' |  'NUTRICIONISTA' | 'PACIENTE'
}
