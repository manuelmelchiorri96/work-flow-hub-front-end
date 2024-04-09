export class TaskVO {
  idTask: number;
  descrizione: string;
  dataInizio: string;
  dataFinePrevista: string;
  statoTask: string;
  idProgetto: number;
  idDipendente: number;

  constructor(
    idTask: number,
    descrizione: string,
    dataInizio: string,
    dataFinePrevista: string,
    statoTask: string,
    idProgetto: number,
    idDipendente: number
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
