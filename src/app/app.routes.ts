import { Routes } from '@angular/router';
import {CounterComponent} from './counter/counter.component';
import {AgentComponent} from './agent/agent.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {
    path: '',component: CounterComponent, pathMatch: 'full'
  }
  ,
  {
    path: 'agent', component: AgentComponent
  },
  {
    path: 'login', component: LoginComponent
  }
];
