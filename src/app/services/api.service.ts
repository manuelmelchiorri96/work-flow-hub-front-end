import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dipendente } from '../models/dipendente';
import { Credenziali } from '../models/credenziali';
import { ProjectManager } from '../models/projectManager';
import { Project } from '../models/project';
import { TaskVO } from '../models/taskVO';
import { Task } from '../models/task';
import { DipendenteVO } from '../models/dipendenteVO';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string =
    'http://localhost:8080/Work_Flow_hub_Back_End_Jpa_Restful-1.0-SNAPSHOT/api/work-flow-hub';

  constructor(private http: HttpClient) {}

  loginDipendente(credenziali: Credenziali): Observable<DipendenteVO> {
    const url = `${this.baseUrl}/dipendenti/login-dipendente`;
    return this.http.post<DipendenteVO>(url, credenziali);
  }

  loginProjectManager(credenziali: Credenziali): Observable<ProjectManager> {
    const url = `${this.baseUrl}/project-manager/login-project-manager`;
    return this.http.post<ProjectManager>(url, credenziali);
  }

  registerDipendente(utente: Dipendente): Observable<Dipendente> {
    const url = `${this.baseUrl}/dipendenti/register-dipendente`;
    return this.http.post<Dipendente>(url, utente);
  }

  registerProjectManager(utente: ProjectManager): Observable<ProjectManager> {
    const url = `${this.baseUrl}/project-manager/register-project-manager`;
    return this.http.post<ProjectManager>(url, utente);
  }

  deleteDipendente(idDipendente: number): Observable<String> {
    return this.http.delete(`${this.baseUrl}/dipendenti/${idDipendente}`, {
      responseType: 'text',
    });
  }

  deleteProjectManager(idProjectManager: number): Observable<String> {
    return this.http.delete(
      `${this.baseUrl}/project-manager/${idProjectManager}`,
      {
        responseType: 'text',
      }
    );
  }

  saveProject(progetto: Project): Observable<Project> {
    const url = `${this.baseUrl}/progetti/save-project`;
    return this.http.post<Project>(url, progetto);
  }

  updateProject(progetto: Project): Observable<Project> {
    const url = `${this.baseUrl}/progetti/update-project`;
    return this.http.put<Project>(url, progetto);
  }

  deleteProject(idProject: number): Observable<String> {
    return this.http.delete(`${this.baseUrl}/progetti/${idProject}`, {
      responseType: 'text',
    });
  }

  getProjects(): Observable<Project[]> {
    const url = `${this.baseUrl}/progetti/all`;
    return this.http.get<Project[]>(url);
  }

  getDipendenti(): Observable<Dipendente[]> {
    const url = `${this.baseUrl}/dipendenti/all`;
    return this.http.get<Dipendente[]>(url);
  }

  getDipendente(idDipendente: number): Observable<Dipendente> {
    const url = `${this.baseUrl}/dipendenti/${idDipendente}`;
    return this.http.get<Dipendente>(url);
  }

  getDipendenteVO(idDipendente: number): Observable<DipendenteVO> {
    const url = `${this.baseUrl}/dipendenti/${idDipendente}/vo`;
    return this.http.get<DipendenteVO>(url);
  }

  getProjectManager(idProjectManager: number): Observable<ProjectManager> {
    const url = `${this.baseUrl}/project-manager/${idProjectManager}`;
    return this.http.get<ProjectManager>(url);
  }

  updateProjectManager(
    projectManager: ProjectManager
  ): Observable<ProjectManager> {
    const url = `${this.baseUrl}/project-manager/update`;
    return this.http.put<ProjectManager>(url, projectManager);
  }

  updateDipendente(dipendente: Dipendente): Observable<Dipendente> {
    const url = `${this.baseUrl}/dipendenti/update`;
    return this.http.put<Dipendente>(url, dipendente);
  }

  getTasksByDipendente(idDipendente: number): Observable<TaskVO[]> {
    const url = `${this.baseUrl}/tasks/all-tasks-dipendenti/${idDipendente}`;
    return this.http.get<TaskVO[]>(url);
  }

  getTasksByProgetto(idProgetto: number): Observable<TaskVO[]> {
    const url = `${this.baseUrl}/tasks/all-tasks-progetto/${idProgetto}`;
    return this.http.get<TaskVO[]>(url);
  }

  saveTask(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/tasks/save-task`;
    return this.http.post<Task>(url, task);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/tasks/update-task`;
    return this.http.put<Task>(url, task);
  }
}
