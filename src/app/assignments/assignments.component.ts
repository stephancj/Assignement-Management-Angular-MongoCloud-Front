import { Component } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {
  titre="Liste des devoirs à rendre";
  c="orange";
  // tableau de devoirs à rendre
  assignments = [
    {
      nom: "Devoir Angular de Mr Buffa",
      dateDeRendu: "2023-06-01",
      rendu:false
    },
    {
      nom: "Devoir Grails de Mr Galli",
      dateDeRendu: "2023-04-15",
      rendu:true
    },
    {
      nom: "Devoir Big Data de Mr Mopolo",
      dateDeRendu: "2023-02-10",
      rendu:true
    }
  ]
}
