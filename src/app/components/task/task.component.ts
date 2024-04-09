import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskVO } from '../../models/taskVO';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  tasksDipendente: TaskVO[] = [];
  messageTasksDipendente: string = '';
  taskDaLevareAlDipendente: Task = {
    idTask: 0,
    descrizione: '',
    dataInizio: '',
    dataFinePrevista: '',
    statoTask: '',
    idProgetto: {
      idProgetto: 0,
      nome: '',
      descrizione: '',
      dataInizio: '',
      dataFinePrevista: '',
      statoProgetto: '',
      projectManager: {
        idProjectManager: 0,
        nome: '',
        cognome: '',
        email: '',
        ruolo: '',
        password: '',
      },
      tasks: [],
    },
    idDipendente: {
      idDipendente: 0,
      nome: '',
      cognome: '',
      email: '',
      ruolo: '',
      password: '',
      tasks: [],
    },
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  prendiTaskDipendente(idDipendente: number) {
    this.apiService.getTasksByDipendente(idDipendente).subscribe({
      next: (data: TaskVO[]) => {
        this.messageTasksDipendente = '';
        this.tasksDipendente = data;
        console.log(this.tasksDipendente);
      },
      error: (error) => {
        this.messageTasksDipendente = error.error;
      },
    });
  }

  resetTasks() {
    this.tasksDipendente = [];
  }

  deleteTaskDalDipendente(taskDipendente: TaskVO) {
    this.taskDaLevareAlDipendente.descrizione = taskDipendente.descrizione;
    this.taskDaLevareAlDipendente.dataInizio = taskDipendente.dataInizio;
    this.taskDaLevareAlDipendente.dataFinePrevista =
      taskDipendente.dataFinePrevista;
    this.taskDaLevareAlDipendente.statoTask = taskDipendente.statoTask;

    this.apiService.updateTask(this.taskDaLevareAlDipendente).subscribe({
      next: (data) => {
        console.log(data);
        this.prendiTaskDipendente(
          this.taskDaLevareAlDipendente.idDipendente.idDipendente
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
