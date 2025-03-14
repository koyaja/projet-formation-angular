import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { CounterComponent } from "./counter/counter.component";
import {AgentComponent} from './agent/agent.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet-formation';

  constructor(){
    //this.counter=1;
  }

  laValeur(event: any){
    console.log(event)
  }

}
