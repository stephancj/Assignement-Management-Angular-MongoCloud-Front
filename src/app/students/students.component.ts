import { Component } from '@angular/core';
import { StudentsService } from '../shared/students.service';
import { Student } from './student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
    constructor(private studentsService:StudentsService) { }

    // les données à afficher
    students:Student[] = [];
    // Pour la data table
    displayedColumns: string[] = ['id', 'picture', 'name', 'email'];
  
    // propriétés pour la pagination
    page: number=1;
    limit: number=10;
    totalDocs: number = 0;
    totalPages: number = 0;
    hasPrevPage: boolean = false;
    prevPage: number = 0;
    hasNextPage: boolean = false;
    nextPage: number = 0;

  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    this.getStudents();
  }

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);
   
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getStudents();
  }

  premierePage() {
    this.page = 1;
    this.getStudents();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getStudents();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getStudents();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getStudents();
  }

  getStudents() {
    console.log("On va chercher les students dans le service");

    this.studentsService.getStudents(this.page, this.limit)
    .subscribe(data => {
      this.students = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("Students reçues");
    });
  }

}
