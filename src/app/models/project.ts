import { ProjectManager } from './projectManager';
import { Task } from './task';

export class Project {
  idProgetto: number;
  nome: string;
  descrizione: string;
  dataInizio: string;
  dataFinePrevista: string;
  statoProgetto: string;
  projectManager: ProjectManager;
  tasks: Task[];

  constructor(
    idProgetto: number,
    nome: string,
    descrizione: string,
    dataInizio: string,
    dataFinePrevista: string,
    statoProgetto: string,
    projectManager: ProjectManager,
    tasks: Task[]
  ) {
    this.idProgetto = idProgetto;
    this.nome = nome;
    this.descrizione = descrizione;
    this.dataInizio = dataInizio;
    this.dataFinePrevista = dataFinePrevista;
    this.statoProgetto = statoProgetto;
    this.projectManager = projectManager;
    this.tasks = tasks;
  }
}
