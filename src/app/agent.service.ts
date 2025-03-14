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
        nom: 'test 2',
        prenom: 'test 2 1',
        matricule: 'test 1 1',
        dateNaissance: new Date(),
        indice: 20,
        salaireBase: 1000,
        actif: true,
      },
      {
        nom: 'test1',
        prenom: 'test1 1',
        matricule: '12365',
        dateNaissance: new Date(),
        indice: 10,
        salaireBase: 60000,
        actif: false,
        allocationFamiliale: 2500
      },
      {
        nom: 'KOM',
        prenom: 'Djack',
        matricule: 'KSBM',
        dateNaissance: new Date(),
        indice: 2,
        salaireBase: 105500,
        actif: false,
        allocationFamiliale: 2699500
      },
      {
        nom: 'test 781',
        prenom: 'DGB',
        matricule: 'TDAZERTY1',
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
