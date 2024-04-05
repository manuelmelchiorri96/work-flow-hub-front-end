import { ProjectManager } from './projectManager';

export class Project {
  nome: string;
  descrizione: string;
  dataInizio: string;
  dataFinePrevista: string;
  statoProgetto: string;
  projectManager: ProjectManager;

  constructor(
    nome: string,
    descrizione: string,
    dataInizio: string,
    dataFinePrevista: string,
    statoProgetto: string,
    projectManager: ProjectManager
  ) {
    this.nome = nome;
    this.descrizione = descrizione;
    this.dataInizio = dataInizio;
    this.dataFinePrevista = dataFinePrevista;
    this.statoProgetto = statoProgetto;
    this.projectManager = projectManager;
  }
}
