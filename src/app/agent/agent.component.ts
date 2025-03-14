import {Component, inject, OnInit} from '@angular/core';
import {Agent} from '../models/agent.model';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AgentService} from '../agent.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {AgentDialogComponent} from './agent-dialog/agent-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-agent',
  imports: [
    NgForOf,
    NgStyle,
    NgClass,
    FormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButton,
    MatAnchor
  ],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css'
})
export class AgentComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['nom', 'prenom', 'matricule', 'salaireBase', 'etat'];
  dataSource = new MatTableDataSource<Agent>([]);
  agents: Agent[] = [];
  agentTemplate: Agent = {
    nom: '',
    prenom: '',
    matricule: '',
    salaireBase: 0
  };

  constructor(private  agentService: AgentService,  private snackBar: MatSnackBar) {


  }

  openDialog(agent?: Agent): void {
    const isNew = !agent;
    const dialogRef = this.dialog.open(AgentDialogComponent, {
      width: '700px',
      data: {
        agent: agent || {
          matricule: '',
          nom: '',
          prenom: '',
          salaireBase: 0,
          actif: true,
          dateNaissance: null,
          indice: null,
          allocationFamiliale: null,
          nbrEnfant: null
        },
        isNew: isNew
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (isNew) {
          try {
            this.agentService.addAgent(result);
            this.showSnackBar('Agent ajouté avec succès');
            this.ngOnInit();
          } catch (error: any) {
            this.showSnackBar(error.message, true);
          }
        } else {
          // this.agentService.updateAgent(result);
          this.showSnackBar('Agent mis à jour avec succès');
        }
      }
    });
  }

  ngOnInit(): void {
  this.agents = this.agentService.getListAgent();
  this.dataSource.data = this.agents;

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
  showSnackBar(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: isError ? ['snackbar-error'] : ['snackbar-success']
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
