import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dipendente } from '../models/dipendente';
import { Credenziali } from '../models/credenziali';
import { ProjectManager } from '../models/projectManager';

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
    const url = `${this.baseUrl}dipendenti/register-dipendente`;
    return this.http.post<Dipendente>(url, utente);
  }

  registerProjectManager(utente: ProjectManager): Observable<ProjectManager> {
    const url = `${this.baseUrl}project-manager/register-project-manager`;
    return this.http.post<ProjectManager>(url, utente);
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
