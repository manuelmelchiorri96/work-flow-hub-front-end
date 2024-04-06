import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dipendente } from '../models/dipendente';
import { Credenziali } from '../models/credenziali';
import { ProjectManager } from '../models/projectManager';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string =
    'http://localhost:8080/Work_Flow_hub_Back_End_Jpa_Restful-1.0-SNAPSHOT/api/work-flow-hub';

  constructor(private http: HttpClient) {}

  loginDipendente(credenziali: Credenziali): Observable<Dipendente> {
    const url = `${this.baseUrl}/dipendenti/login-dipendente`;
    return this.http.post<Dipendente>(url, credenziali);
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

  getDipendenti(): Observable<Dipendente[]> {
    const url = `${this.baseUrl}/dipendenti/all`;
    return this.http.get<Dipendente[]>(url);
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

  getDipendente(idDipendente: number): Observable<Dipendente> {
    const url = `${this.baseUrl}/dipendenti/${idDipendente}`;
    return this.http.get<Dipendente>(url);
  }

  getProjectManager(idProjectManager: number): Observable<ProjectManager> {
    const url = `${this.baseUrl}/project-manager/${idProjectManager}`;
    return this.http.get<ProjectManager>(url);
  }

  /*
  update(utente: Utente): Observable<Utente> {
    const url = `${this.baseUrl}/update`;
    return this.http.put<Utente>(url, utente);
  }

  getUserInfo(idUtente: number): Observable<Utente> {
    return this.http.get<Utente>(`${this.baseUrl}/${idUtente}`);
  }

  deleteAccount(idUtente: number) {
    return this.http.delete(`${this.baseUrl}/${idUtente}`, {
      responseType: 'text',
    });
  }*/
}
