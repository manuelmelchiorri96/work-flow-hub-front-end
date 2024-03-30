import { Task } from './task';

export class Dipendente {
  idDipendente: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  password: string;
  tasks: Task[];

  constructor(
    idDipendente: number,
    nome: string,
    cognome: string,
    email: string,
    ruolo: string,
    password: string,
    tasks: Task[] = []
  ) {
    this.idDipendente = idDipendente;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.ruolo = ruolo;
    this.password = password;
    this.tasks = tasks;
  }
}
