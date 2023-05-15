import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit{
  titre="Liste des devoirs à rendre";
  c="orange";
  ajoutActive=false;
  // assignment cliqué
  assignmentSelectionne!:Assignment;

  // champs du formulaire
  nomDevoir="";
  dateDeRendu!:Date;

  // tableau de devoirs à rendre
  assignments:Assignment[] = [
    {
      nom: "Devoir Angular de Mr Buffa",
      dateDeRendu: new Date("2023-06-01"),
      rendu:false
    },
    {
      nom: "Devoir Grails de Mr Galli",
      dateDeRendu: new Date("2023-04-15"),
      rendu:true
    },
    {
      nom: "Devoir Big Data de Mr Mopolo",
      dateDeRendu: new Date("2023-02-10"),
      rendu:true
    }
  ]

  ngOnInit(): void {
    console.log("Composant instancié et rendu HTML effectué (le composant est visible dans la page HTML)");
    setTimeout(() => {
      this.ajoutActive=true;
    }, 4000);
  }

  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if(this.nomDevoir === "") return;
    if(this.dateDeRendu === undefined) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignments.push(nouvelAssignment);
  }

  onAssignmentClique(assignment:Assignment) {
    console.log("Assignment cliqué : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }
}
