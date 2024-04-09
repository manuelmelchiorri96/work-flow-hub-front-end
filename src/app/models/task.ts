import { Dipendente } from "./dipendente";
import { Project } from "./project";

export class Task {
  idTask: number;
  descrizione: string;
  dataInizio: string;
  dataFinePrevista: string;
  statoTask: string;
  idProgetto: Project;
  idDipendente: Dipendente;

  constructor(
    idTask: number,
    descrizione: string,
    dataInizio: string,
    dataFinePrevista: string,
    statoTask: string,
    idProgetto: Project,
    idDipendente: Dipendente
  ) {
    this.idTask = idTask;
    this.descrizione = descrizione;
    this.dataInizio = dataInizio;
    this.dataFinePrevista = dataFinePrevista;
    this.statoTask = statoTask;
    this.idProgetto = idProgetto;
    this.idDipendente = idDipendente;
  }
}
