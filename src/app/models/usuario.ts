export class Usuario {
    id?: number;
    login!: string;
    senha!: string;
    nivelAcesso!: 'ADM' |  'NUTRICIONISTA' | 'PACIENTE';
}
