import { Injectable } from '@angular/core';
import {Agent} from './models/agent.model';
import {Observable, of, throwError} from 'rxjs';

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

  updateAgent(matricule:string, result: Agent):Observable<Agent> {
    // find in list agent  by matricule
    let updateAgent = this.agentList.find(agent => agent.matricule === matricule);
    let updateAgentIndex = this.agentList.findIndex(agent => agent.matricule === matricule);
    if (updateAgent) {
      updateAgent.nom = result.nom;
      updateAgent.prenom = result.prenom;
      updateAgent.salaireBase = result.salaireBase;
      this.agentList[updateAgentIndex]=updateAgent;
      return of(updateAgent);
    } else {
      return throwError(()=>new Error("Agent not found"));
    }


  }

  remove(result: Agent):Observable<any> {
   this.agentList = this.agentList.filter(agent => agent.matricule !== result.matricule);
      // this.agentList.slice(updateAgentIndex,updateAgentIndex);
      return of(null);
  }
}
