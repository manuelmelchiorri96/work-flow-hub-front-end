import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credenziali } from '../../models/credenziali';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  selectedRole: string = '';
  idDipendente: number = 0;
  idProjectManager: number = 0;
  ruolo: string = '';
  loginFailed: boolean = false;
  resultLogin: boolean = false;
  messageResultLogin: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  login() {
    const credenziali: Credenziali = {
      email: this.email,
      password: this.password,
    };

    if (
      credenziali.email !== '' &&
      credenziali.password !== '' &&
      this.selectedRole === ''
    ) {
      this.loginFailed = true;
      this.resultLogin = false;
    }

    if (this.selectedRole === 'dipendente') {
      this.apiService.loginDipendente(credenziali).subscribe({
        next: (data) => {
          this.idDipendente = data.idDipendente;
          this.ruolo = data.ruolo;
          this.router.navigate(['/dashboard', this.idDipendente, this.ruolo]);
        },
        error: (error) => {
          console.error('Errore durante il login:', error);
          this.messageResultLogin = error.error;
          this.resultLogin = true;
          this.loginFailed = false;
        },
      });
    }

    if (this.selectedRole === 'project-manager') {
      this.apiService.loginProjectManager(credenziali).subscribe({
        next: (data) => {
          this.idProjectManager = data.idProjectManager;
          this.ruolo = data.ruolo;
          this.router.navigate([
            '/dashboard',
            this.idProjectManager,
            this.ruolo,
          ]);
        },
        error: (error) => {
          console.error('Errore durante il login:', error);
          this.messageResultLogin = error.error;
          this.resultLogin = true;
          this.loginFailed = false;
        },
      });
    }
  }
}
