import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Assignment } from '../assignment.model';




@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  // champs du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;


  constructor(private assignmentsService: AssignmentsService,
              private router:Router, private _formBuilder: FormBuilder, 
              private snackBar: MatSnackBar, private http: HttpClient,
              public dialogRef: MatDialogRef<AddAssignmentComponent>,
   @Inject(MAT_DIALOG_DATA) public data: Assignment,
   private dialogService: DialogService) { }

   ngOnInit(): void {
    this.dialogService.dialogClose$.subscribe(() => {
     this.dialogRef.close();
   });
  }

  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if (this.nomDevoir === "") return;
    if (this.dateDeRendu === undefined) return;

    let nouvelAssignment = new Assignment();
    // génération d'id, plus tard ce sera fait dans la BD
    nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    // on demande au service d'ajouter l'assignment
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(response => {
        console.log(response);

        // On va naviguer vers la page d'accueil pour afficher la liste
        // des assignments
        this.router.navigate(["/home"]);
        this.snackBar.open(`The ${nouvelAssignment.nom} assignment added successfully!`, 'Close', {
          duration: 7000,
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-success']
        });

      }, (error) =>{
        this.snackBar.open(`Error occurred when adding the ${nouvelAssignment.nom} assignment!`, 'Close', {
          duration: 7000,
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      });
      this.dialogService.closeDialog();
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
}
