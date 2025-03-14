import {Component, OnInit} from '@angular/core';
import {Agent} from '../models/agent.model';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AgentService} from '../agent.service';

@Component({
  selector: 'app-agent',
  imports: [
    NgForOf,
    NgStyle,
    NgClass,
    FormsModule,
    NgIf
  ],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css'
})
export class AgentComponent implements OnInit {


  agents: Agent[] = [];
  agentTemplate: Agent = {
    nom: '',
    prenom: '',
    matricule: '',
    salaireBase: 0
  };

  constructor(private  agentService: AgentService) {


  }


  ngOnInit(): void {
  this.agents = this.agentService.getListAgent();

  }

  submitAgent(value: any) {
    console.log('form ', value)
    if (value.salaireBase > 10){
      value.actif = true;
    }
   // this.agents.push(value);
    this.agentService.addAgent(value);

    this.agentTemplate = {
      nom: '',
      prenom: '',
      matricule: '',
      salaireBase: 0
    };
  }
}
