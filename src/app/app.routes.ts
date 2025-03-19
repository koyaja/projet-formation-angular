import { Routes } from '@angular/router';
import {CounterComponent} from './counter/counter.component';
import {AgentComponent} from './agent/agent.component';
import {LoginComponent} from './login/login.component';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  {
    path: '',component: CounterComponent, pathMatch: 'full',
    canActivate: [authGuard]
  }
  ,
  {
    path: 'agent', component: AgentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login', component: LoginComponent
  }
];
