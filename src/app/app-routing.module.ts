import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/:id/:ruolo', component: DashboardComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'task/:id/:ruolo/:idDipendente', component: TaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
