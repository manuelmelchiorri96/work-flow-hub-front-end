import { Component, OnDestroy } from '@angular/core';
import { Dipendente } from '../../models/dipendente';
import { ApiService } from '../../services/api.service';
import { ProjectManager } from '../../models/projectManager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.css',
})
export class RegistrazioneComponent implements OnDestroy {
  nome: string = '';
  cognome: string = '';
  email: string = '';
  password: string = '';
  ruolo: string = '';

  resultRegistrazione: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnDestroy() {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop && modalBackdrop.parentNode) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  }

  updateRuolo(event: Event): void {
    this.ruolo = (event.target as HTMLSelectElement).value;

    if (this.ruolo === 'Option 1') {
      this.ruolo = 'sviluppatore';
    } else {
      this.ruolo = 'project-manager';
    }
  }

  register(): void {
    if (
      (this.ruolo !== 'project-manager' && this.ruolo !== 'sviluppatore') ||
      this.nome === ' ' ||
      this.cognome === ' ' ||
      this.email === ' ' ||
      this.password === ' '
    ) {
      this.resultRegistrazione = 'Non posso esserci campi vuoti.';
    }

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
          this.resultRegistrazione = 'Registrazione avvenuta con successo.';
        },
        error: (error) => {
          this.resultRegistrazione = error.error;
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
          this.resultRegistrazione = 'Registrazione avvenuta con successo.';
        },
        error: (error) => {
          this.resultRegistrazione = error.error;
        },
      });
    }
  }

  chiudiRisultatoRegistrazione() {
    this.router.navigate(['/login']);
  }
}
