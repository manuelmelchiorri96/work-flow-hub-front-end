export class DipendenteVO {
  idDipendente: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  password: string;

  constructor(
    idDipendente: number,
    nome: string,
    cognome: string,
    email: string,
    ruolo: string,
    password: string
  ) {
    this.idDipendente = idDipendente;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.ruolo = ruolo;
    this.password = password;
  }
}
