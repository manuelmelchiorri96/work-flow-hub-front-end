import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskVO } from '../../models/taskVO';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ProjectManager } from '../../models/projectManager';
import { DipendenteVO } from '../../models/dipendenteVO';
import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { ProgettoDTO } from '../../models/progettoDTO';
import { DipendenteDTO } from '../../models/dipendenteDTO';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit, OnDestroy {
  idUserLogged: number = 0;
  ruolo: string = '';
  idDipendenteDaGestire: number = 0;

  projectManagerLogged: ProjectManager = {
    idProjectManager: 0,
    nome: '',
    cognome: '',
    email: '',
    ruolo: '',
    password: '',
  };
  dipendenteDaGestire: DipendenteVO = {
    idDipendente: 0,
    nome: '',
    cognome: '',
    email: '',
    ruolo: '',
    password: '',
  };
  nomeCognomeUserLogged: string = '';

  searchTask: string = '';
  tasksDipendente: TaskVO[] = [];
  tasksDipendenteFiltrati: TaskVO[] = [];

  messageTasksDipendente: string = '';

  projects: Project[] = [];
  taskDaAssegnare: Task = {
    idTask: 0,
    descrizione: '',
    dataInizio: '',
    dataFinePrevista: '',
    statoTask: '',
    progetto: new ProgettoDTO(0),
    dipendente: new DipendenteDTO(0),
  };

  nuovaPassword: string = '';
  confermaNuovaPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUserLogged = params['id'];
      this.ruolo = params['ruolo'];
      this.idDipendenteDaGestire = params['idDipendente'];
    });
    this.getUserLogged();
    this.getDipendenteDaGestire();
    this.prendiTaskDipendente(this.idDipendenteDaGestire);
    this.loadProjects();
  }

  ngOnDestroy() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop && modalBackdrop.parentNode) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  }

  getUserLogged() {
    this.apiService.getProjectManager(this.idUserLogged).subscribe({
      next: (data) => {
        this.projectManagerLogged = data;
        this.nomeCognomeUserLogged = data.nome + ' ' + data.cognome;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getDipendenteDaGestire() {
    this.apiService.getDipendenteVO(this.idDipendenteDaGestire).subscribe({
      next: (data) => {
        this.dipendenteDaGestire = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  prendiTaskDipendente(idDipendente: number) {
    this.apiService.getTasksByDipendente(idDipendente).subscribe({
      next: (data: TaskVO[]) => {
        this.messageTasksDipendente = '';
        this.tasksDipendente = data;
        this.tasksDipendenteFiltrati = [...this.tasksDipendente];
      },
      error: (error) => {
        this.messageTasksDipendente = error.error;
      },
    });
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        console.log(this.projects);
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei progetti:', error);
      },
    });
  }

  cercaTask() {
    if (this.searchTask.trim() !== '') {
      this.tasksDipendenteFiltrati = this.tasksDipendente.filter(
        (tasksDipendente) =>
          tasksDipendente.descrizione
            .toLowerCase()
            .includes(this.searchTask.toLowerCase())
      );
    } else {
      this.tasksDipendenteFiltrati = [...this.tasksDipendente];
    }
  }

  assegnaTask() {
    this.taskDaAssegnare.dipendente.idDipendente = Number(
      this.idDipendenteDaGestire
    );
    this.taskDaAssegnare.progetto.idProgetto = Number(
      this.taskDaAssegnare.progetto.idProgetto
    );

    this.apiService.saveTask(this.taskDaAssegnare).subscribe({
      next: (data) => {
        this.prendiTaskDipendente(this.idDipendenteDaGestire);
      },
      error: (error) => {
        console.error(error.error);
      },
    });
  }

  updateUtenteLogged() {
    if (this.nuovaPassword === '' && this.confermaNuovaPassword === '') {
      this.apiService
        .updateProjectManager(this.projectManagerLogged)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.nomeCognomeUserLogged =
              this.projectManagerLogged.nome +
              ' ' +
              this.projectManagerLogged.cognome;
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
    if (this.nuovaPassword !== '' || this.confermaNuovaPassword !== '') {
      if (this.nuovaPassword === this.confermaNuovaPassword) {
        this.projectManagerLogged.password = this.nuovaPassword;
        this.apiService
          .updateProjectManager(this.projectManagerLogged)
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (error) => {
              console.error(error);
            },
          });
      }
    }
  }

  eliminaAccount() {
    throw new Error('Method not implemented.');
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
