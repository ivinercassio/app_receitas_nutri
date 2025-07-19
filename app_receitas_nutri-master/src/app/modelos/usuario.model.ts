export interface Usuario {
    idUsuario: number;
    nome: string;
    email: string;
    tipoUsuario: 'nutricionista' | 'paciente';
    foto?: string;
  }