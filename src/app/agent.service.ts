import { Injectable } from '@angular/core';
import {Agent} from './models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
agentList: Agent[]=[
];
  constructor() {
    this.agentList = [
      {
        nom: 'test 1',
        prenom: 'test 1 1',
        matricule: 'test 1 1',
        dateNaissance: new Date(),
        indice: 20,
        salaireBase: 1000,
        actif: true,
      },
      {
        nom: 'test 1',
        prenom: 'test 1 1',
        matricule: 'test 1 1',
        dateNaissance: new Date(),
        indice: 10,
        salaireBase: 1000,
        actif: false,
        allocationFamiliale: 2500
      },
      {
        nom: 'test 1',
        prenom: 'test 1 1',
        matricule: 'test 1 1',
        dateNaissance: new Date(),
        indice: 10,
        salaireBase: 1000,
        actif: false,
        allocationFamiliale: 2500
      },
      {
        nom: 'test 1',
        prenom: 'test 1 1',
        matricule: 'test 1 1',
        dateNaissance: new Date(),
        indice: 10,
        salaireBase: 1000,
        actif: true,
        allocationFamiliale: 2500
      }
    ]
  }

  getListAgent(){
    return this.agentList;
  }

  addAgent(agent: Agent){
    this.agentList.push(agent);
  }

}
