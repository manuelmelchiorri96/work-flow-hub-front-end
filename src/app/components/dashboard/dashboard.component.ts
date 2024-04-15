import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/project';
import { Dipendente } from '../../models/dipendente';
import { ProjectManager } from '../../models/projectManager';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
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
  nomeCognomeUserLogged: string = '';

  searchDipendenteTable: string = '';
  searchProgettoTable: string = '';

  projectToSaved: Project = {
    idProgetto: 0,
    nome: '',
    descrizione: '',
    dataInizio: '',
    dataFinePrevista: '',
    statoProgetto: '',
    projectManager: this.projectManagerLogged,
    tasks: [],
  };
  selectedProject: Project = {
    idProgetto: 0,
    nome: '',
    descrizione: '',
    dataInizio: '',
    dataFinePrevista: '',
    statoProgetto: '',
    projectManager: this.projectManagerLogged,
    tasks: [],
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
      this.id = params['id'];
      this.ruolo = params['ruolo'];
    });
    this.isProjectManager();
    this.getUserLogged();
  }

  ngOnDestroy() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop && modalBackdrop.parentNode) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
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
          this.nomeCognomeUserLogged = data.nome + ' ' + data.cognome;
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
          this.nomeCognomeUserLogged = data.nome + ' ' + data.cognome;
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
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.progettiFiltrati = [...this.projects];
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei progetti:', error);
      },
    });
  }

  cercaDipendentePerNome() {
    if (this.searchDipendenteTable.trim() !== '') {
      this.dipendentiFiltrati = this.dipendenti.filter((dipendente) =>
        (
          dipendente.nome.toLowerCase() +
          ' ' +
          dipendente.cognome.toLowerCase()
        ).includes(this.searchDipendenteTable.toLowerCase())
      );
    } else {
      this.dipendentiFiltrati = [...this.dipendenti];
    }
  }

  cercaProgettoPerNome() {
    if (this.searchProgettoTable.trim() !== '') {
      this.progettiFiltrati = this.projects.filter((progetto) =>
        progetto.nome
          .toLowerCase()
          .includes(this.searchProgettoTable.toLowerCase())
      );
    } else {
      this.progettiFiltrati = [...this.projects];
    }
  }

  salvaProgetto() {
    this.projectToSaved.projectManager = this.projectManagerLogged;
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

  prendiProgettoDaEliminare(progetto: Project) {
    this.selectedProject = { ...progetto };
    this.selectedProject.projectManager = this.projectManagerLogged;
  }

  eliminaProgetto() {
    this.apiService.deleteProject(this.selectedProject.idProgetto).subscribe({
      next: (data) => {
        this.loadProjects();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  prendiProgettoDaModificare(progetto: Project) {
    this.selectedProject = { ...progetto };
    this.selectedProject.projectManager = this.projectManagerLogged;

    this.apiService.getTasksByProgetto(progetto.idProgetto).subscribe({
      next: (data) => {
        console.log(this.selectedProject);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  modificaProgetto() {
    this.apiService.updateProject(this.selectedProject).subscribe({
      next: (data) => {
        this.loadProjects();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateUtenteLogged() {
    if (this.nuovaPassword === '' && this.confermaNuovaPassword === '') {
      if (this.ruolo === 'project-manager') {
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
      } else {
        this.apiService.updateDipendente(this.dipendenteLogged).subscribe({
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
    } else {
      if (this.nuovaPassword !== '' || this.confermaNuovaPassword !== '') {
        if (this.nuovaPassword === this.confermaNuovaPassword) {
          if (this.ruolo === 'project-manager') {
            this.projectManagerLogged.password = this.nuovaPassword;
            console.log(this.projectManagerLogged);

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
          } else {
            this.dipendenteLogged.password = this.nuovaPassword;
            console.log(this.dipendenteLogged);

            this.apiService.updateDipendente(this.dipendenteLogged).subscribe({
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
    }
  }

  vaiAPaginaTask(idDipendente: number) {
    if (this.ruolo === 'project-manager') {
      this.router.navigate(['/task', this.id, this.ruolo, idDipendente]);
    }
  }

  eliminaAccount() {
    if (this.ruolo === 'dipendente') {
      this.apiService.deleteDipendente(this.id).subscribe({
        next: (data) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
    if (this.ruolo === 'project-manager') {
      this.apiService.deleteProjectManager(this.id).subscribe({
        next: (data) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
