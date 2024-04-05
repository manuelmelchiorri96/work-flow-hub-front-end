import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/project';
import { Dipendente } from '../../models/dipendente';
import { ProjectManager } from '../../models/projectManager';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  id: number = 0;
  ruolo: string = '';
  projects: Project[] = [];
  progettiFiltrati: Project[] = [];
  dipendenti: Dipendente[] = [];
  dipendentiFiltrati: Dipendente[] = [];
  dipendenteLogged: Dipendente = {
    idDipendente: 0,
    nome: '',
    cognome: '',
    email: '',
    ruolo: '',
    password: '',
    tasks: [],
  };
  projectManagerLogged: ProjectManager = {
    idProjectManager: 0,
    nome: '',
    cognome: '',
    email: '',
    ruolo: '',
    password: '',
  };
  nomeCognomeUtente: string = '';
  nomeDipendenteCercato: string = '';
  nomeProgettoCercato: string = '';
  projectToSaved: Project = {
    nome: '',
    descrizione: '',
    dataInizio: '',
    dataFinePrevista: '',
    statoProgetto: '',
    projectManager: this.projectManagerLogged,
  };
  selectedProject: Project = {
    nome: '',
    descrizione: '',
    dataInizio: '',
    dataFinePrevista: '',
    statoProgetto: '',
    projectManager: this.projectManagerLogged,
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.ruolo = params['ruolo'];
    });
    this.isProjectManager();
    this.getUserLogged();
  }

  isProjectManager() {
    if (this.ruolo === 'project-manager') {
      this.loadDipendenti();
      this.loadProjects();
    }
  }

  getUserLogged() {
    if (this.ruolo === 'sviluppatore') {
      this.apiService.getDipendente(this.id).subscribe({
        next: (data) => {
          this.dipendenteLogged = data;
          this.nomeCognomeUtente = data.nome + ' ' + data.cognome;

          console.log(this.dipendenteLogged);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
    if (this.ruolo === 'project-manager') {
      this.apiService.getProjectManager(this.id).subscribe({
        next: (data) => {
          this.projectManagerLogged = data;
          this.nomeCognomeUtente = data.nome + ' ' + data.cognome;

          console.log(this.projectManagerLogged);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  loadDipendenti() {
    this.apiService.getDipendenti().subscribe({
      next: (data) => {
        this.dipendenti = data;
        this.dipendentiFiltrati = [...this.dipendenti];
        console.log(this.dipendenti);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  cercaDipendentePerNome() {
    if (this.nomeDipendenteCercato.trim() !== '') {
      this.dipendentiFiltrati = this.dipendenti.filter((dipendente) =>
        (
          dipendente.nome.toLowerCase() +
          ' ' +
          dipendente.cognome.toLowerCase()
        ).includes(this.nomeDipendenteCercato.toLowerCase())
      );
    } else {
      this.dipendentiFiltrati = [...this.dipendenti];
    }
  }

  cercaProgettoPerNome() {
    if (this.nomeProgettoCercato.trim() !== '') {
      this.progettiFiltrati = this.projects.filter((progetto) =>
        progetto.nome
          .toLowerCase()
          .includes(this.nomeProgettoCercato.toLowerCase())
      );
    } else {
      this.progettiFiltrati = [...this.projects];
    }
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.progettiFiltrati = [...this.projects];
        console.log(this.projects);
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei progetti:', error);
      },
    });
  }

  salvaProgetto() {
    this.projectToSaved.projectManager = this.projectManagerLogged;
    console.log(this.projectToSaved);

    this.apiService.saveProject(this.projectToSaved).subscribe({
      next: (data) => {
        console.log(data);
        this.loadProjects();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  eliminaProgetto(progetto: Project) {}

  prendiProgettoDaModificare(progetto: Project) {
    this.selectedProject = { ...progetto };
    this.selectedProject.projectManager = this.projectManagerLogged;
  }

  modificaProgetto() {
    this.apiService.updateProject(this.selectedProject).subscribe({
      next: (data) => {
        console.log(data);
        console.log(this.selectedProject);
        this.loadProjects();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
