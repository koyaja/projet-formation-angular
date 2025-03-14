import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Agent} from '../../models/agent.model';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-agent-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormField,
    MatInput,
    NgIf,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatDialogActions,
    MatButton,
    MatCheckbox,
    MatLabel,
    MatError
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './agent-dialog.component.html',
  styleUrl: './agent-dialog.component.css'
})
export class AgentDialogComponent implements OnInit {
  agentForm!: FormGroup;
  dialogTitle: string;
  isNewAgent: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { agent: Agent; isNew: boolean }
  ) {
    this.isNewAgent = data.isNew;
    this.dialogTitle = this.isNewAgent ? 'Ajouter un agent' : 'Modifier un agent';
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.agentForm = this.fb.group({
      matricule: [
        { value: this.data.agent.matricule, disabled: !this.isNewAgent },
        [Validators.required, Validators.pattern('^[A-Z0-9]+$')]
      ],
      nom: [this.data.agent.nom, [Validators.required]],
      prenom: [this.data.agent.prenom, [Validators.required]],
      dateNaissance: [this.data.agent.dateNaissance],
      indice: [this.data.agent.indice, [Validators.min(0)]],
      salaireBase: [this.data.agent.salaireBase, [Validators.required, Validators.min(0)]],
      actif: [this.data.agent.actif !== undefined ? this.data.agent.actif : true],
      allocationFamiliale: [this.data.agent.allocationFamiliale, [Validators.min(0)]],
      nbrEnfant: [this.data.agent.nbrEnfant, [Validators.min(0), Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const formValues = this.agentForm.getRawValue(); // Pour récupérer aussi les champs désactivés
      const agent: Agent = {
        matricule: formValues.matricule,
        nom: formValues.nom,
        prenom: formValues.prenom,
        dateNaissance: formValues.dateNaissance,
        indice: formValues.indice,
        salaireBase: formValues.salaireBase,
        actif: formValues.actif,
        allocationFamiliale: formValues.allocationFamiliale,
        nbrEnfant: formValues.nbrEnfant
      };

      this.dialogRef.close(agent);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
