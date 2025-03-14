
export interface Agent{
    matricule: string;
    nom: string;
    prenom: string ;
    dateNaissance?: Date;
    indice?: number;
    salaireBase: number;
    actif?:boolean;
    allocationFamiliale?:number;
    nbrEnfant?: number;

}
