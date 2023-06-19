import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Assignment } from '../assignment.model';


@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment | undefined;
 // associées aux champs du formulaire
 nomAssignment!: string;
 dateDeRendu!: Date;

 constructor(
   private assignmentsService: AssignmentsService,
   private route: ActivatedRoute,
   private router: Router,
   public dialogRef: MatDialogRef<EditAssignmentComponent>,
   @Inject(MAT_DIALOG_DATA) public data: Assignment,
   private dialogService: DialogService,
   private snackBar: MatSnackBar
 ) {
  console.log('Data received:', data);
 }

 ngOnInit(): void {
   this.getAssignment();
   this.dialogService.dialogClose$.subscribe(() => {
    this.dialogRef.close();
  });
 }
 getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  // const id = +this.route.snapshot.params['id'];
  const id = this.data.id;

  this.assignmentsService.getAssignment(id)
  .subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    // Pour pré-remplir le formulaire
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
  });
}
onSaveAssignment() {
  if (!this.assignment) return;

  // on récupère les valeurs dans le formulaire
  this.assignment.nom = this.nomAssignment;
  this.assignment.dateDeRendu = this.dateDeRendu;
  this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe((message) => {
      console.log(message);
      this.snackBar.open(`The ${this.assignment!.nom} assignment is successfully edited!`, 'Close', {
        duration: 7000,
        verticalPosition: 'bottom',
        panelClass : ['mat-toolbar', 'mat-success']
      });
    }, (error) => {
      console.log(error);
      this.snackBar.open(`The ${this.assignment!.nom} assignment is not edited!`, 'Close', {
        duration: 7000,
        verticalPosition: 'bottom',
        panelClass : ['mat-toolbar', 'mat-warn']
      });
    });
  this.dialogService.closeDialog();
  }
}
