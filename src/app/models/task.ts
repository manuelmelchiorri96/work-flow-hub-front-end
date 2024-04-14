import { DipendenteDTO } from './dipendenteDTO';
import { ProgettoDTO } from './progettoDTO';

export class Task {
  idTask: number;
  descrizione: string;
  dataInizio: string;
  dataFinePrevista: string;
  statoTask: string;
  progetto: ProgettoDTO;
  dipendente: DipendenteDTO;

  constructor(
    idTask: number,
    descrizione: string,
    dataInizio: string,
    dataFinePrevista: string,
    statoTask: string,
    progetto: ProgettoDTO,
    dipendente: DipendenteDTO
  ) {
    this.idTask = idTask;
    this.descrizione = descrizione;
    this.dataInizio = dataInizio;
    this.dataFinePrevista = dataFinePrevista;
    this.statoTask = statoTask;
    this.progetto = progetto;
    this.dipendente = dipendente;
  }
}
