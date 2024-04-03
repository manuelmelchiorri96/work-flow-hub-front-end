import { Component } from '@angular/core';
import { Dipendente } from '../../models/dipendente';
import { ApiService } from '../../services/api.service';
import { ProjectManager } from '../../models/projectManager';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.css',
})
export class RegistrazioneComponent {
  nome: string = '';
  cognome: string = '';
  email: string = '';
  password: string = '';
  ruolo: string = '';

  constructor(private apiService: ApiService) {}

  register(): void {
    if (this.ruolo === 'sviluppatore') {
      const nuovoDipendente: Dipendente = {
        idDipendente: 0,
        nome: this.nome,
        cognome: this.cognome,
        email: this.email,
        password: this.password,
        ruolo: this.ruolo,
        tasks: [],
      };
      this.apiService.registerDipendente(nuovoDipendente).subscribe({
        next: (data) => {
          console.log('Registrazione avvenuta con successo:', data);
        },
        error: (error) => {
          console.error('Errore durante la registrazione:', error);
        },
      });
    }
    if (this.ruolo === 'project-manager') {
      const nuovoProjectManager: ProjectManager = {
        idProjectManager: 0,
        nome: this.nome,
        cognome: this.cognome,
        email: this.email,
        password: this.password,
        ruolo: this.ruolo,
      };
      this.apiService.registerProjectManager(nuovoProjectManager).subscribe({
        next: (data) => {
          console.log('Registrazione avvenuta con successo:', data);
        },
        error: (error) => {
          console.error('Errore durante la registrazione:', error);
        },
      });
    }
  }
}
