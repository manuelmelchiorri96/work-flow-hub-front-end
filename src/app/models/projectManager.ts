export class ProjectManager {
  idProjectManager: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  password: string;

  constructor(
    idProjectManager: number,
    nome: string,
    cognome: string,
    email: string,
    ruolo: string,
    password: string
  ) {
    this.idProjectManager = idProjectManager;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.ruolo = ruolo;
    this.password = password;
  }
}
