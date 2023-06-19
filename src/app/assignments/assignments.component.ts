import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, pairwise, tap } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { DialogService } from '../shared/dialog.service';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { Assignment } from './assignment.model';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  @Output() addClicked = new EventEmitter<string>();

  titre="Liste des devoirs à rendre";
  // les données à afficher
  assignments:Assignment[] = [];
  submittedAssignments:Assignment[] = [];
  notSubmittedAssignments:Assignment[] = [];
  // Pour la data table
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];

  // propriétés pour la pagination
  page: number=1;
  limit: number=10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
;

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(private assignmentsService:AssignmentsService,
              private ngZone: NgZone, public dialog: MatDialog, 
              private snackBar : MatSnackBar, 
              private dialogService: DialogService) {}
  
  
  onAddClick() {
    this.addClicked.emit('Add assignment');
  }
  
  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");

    this.getAssignments();
  }

  ngAfterViewInit() { 
    console.log("after view init");

    if(!this.scroller) return;

    // on s'abonne à l'évènement scroll de la liste
    this.scroller.elementScrolled()
    .pipe(
      tap(event => {
        //console.log(event);
      }),
      map(event => {
         return this.scroller.measureScrollOffset('bottom');
      }),
      tap(y => {
        //console.log("y = " + y);
      }),
      pairwise(),
      tap(([y1, y2]) => {
        //console.log("y1 = " + y1 + " y2 = " + y2);
      }),
      filter(([y1, y2]) => {
        return y2 < y1 && y2 < 100;
      }),
      // Pour n'envoyer des requêtes que toutes les 200ms
      //throttleTime(200)
    )
    .subscribe((val) => {
      console.log("val = " + val);
      console.log("je CHARGE DE NOUVELLES DONNEES page = " + this.page);
      this.ngZone.run(() => {
        if(!this.hasNextPage) return;

        this.page = this.nextPage;
        this.getAddAssignmentsForScroll();
      });
    });
  }

  getAssignments() {
    console.log("On va chercher les assignments dans le service");

    this.assignmentsService.getAssignments(this.page, this.limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      this.submittedAssignments = this.assignments.filter(a => a.rendu);
      this.notSubmittedAssignments = this.assignments.filter(a => false === a.rendu);

      console.log(this.submittedAssignments);

      console.log("Données reçues");
    });
  }

  getAddAssignmentsForScroll() {
    this.assignmentsService.getAssignments(this.page, this.limit)
    .subscribe(data => {
      // au lieu de remplacer le tableau, on va concaténer les nouvelles données
      this.assignments = this.assignments.concat(data.docs);
      // ou comme ceci this.assignments = [...this.assignments, ...data.docs]
      //this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("Données ajoutées pour scrolling");
    });
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);
   
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAssignments();
  }

  onDrop(event: CdkDragDrop<Assignment[]>) {
    console.log(event);

    if(event.previousContainer === event.container) {
      console.log("dans le même container");
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("dans un autre container");
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.changeRendu(event.container.data[event.currentIndex]);
    }
  }

  //delete assignment
  deleteAssignment(assignment: Assignment) {
    this.assignmentsService.deleteAssignment(assignment).subscribe(
      () => {
        console.log();
        this.getAssignments();
        this.snackBar.open(`The ${assignment.nom} is successfully deleted!`, 'Close', {
          duration: 7000,
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open(`Error deleting ${assignment.nom} assignment!`, 'Close', {
          duration: 7000,
          verticalPosition: 'bottom',
        });
      }
    );
  }

  changeRendu(assignment: Assignment) {
    assignment.rendu = !assignment.rendu;
    this.assignmentsService.updateAssignment(assignment).subscribe(
      () => {
        console.log();
        this.getAssignments();
        this.snackBar.open(`The ${assignment.nom} assigment is updated successfully!`, 'Close', {
          duration: 7000,
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open(`Error updating the ${assignment.nom} assignment!`, 'Close', {
          duration: 7000,
          verticalPosition: 'bottom',
          panelClass : ['mat-toolbar', 'mat-warn']
        });
      }
    );
    this.getAssignments();
  }

  editAssignment(assignment: Assignment) {
    const dialogRef = this.dialog.open(EditAssignmentComponent, {
      width: '500px',
      data: assignment
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAssignments();
    });
  }

  addAssignment(){
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAssignments();
    }, (error) => {
      console.log(error);
    });
  }

  convertDateFormat(dateString: string) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();
  
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  
    return formattedDate;
  }
}
