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
  idDipendente: number = 0;
  loginFailed: boolean = false;
  resultLogin: boolean = false;
  messageResultLogin: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  login() {
    const credenziali: Credenziali = {
      email: this.email,
      password: this.password,
    };
    this.apiService.login(credenziali).subscribe({
      next: (data) => {
        this.idDipendente = data.idDipendente;
        this.router.navigate(['/dashboard', this.idDipendente]);
      },
      error: (error) => {
        console.error('Errore durante il login:', error);
        this.messageResultLogin = error.error;
        this.resultLogin = true;
      },
    });
  }
}
