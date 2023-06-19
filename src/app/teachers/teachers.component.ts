import { Component } from '@angular/core';
import { TeachersService } from '../shared/teachers.service';
import { Teacher } from './teacher.model';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  constructor(private teachersService:TeachersService) { }

    // les données à afficher
    teachers:Teacher[] = [];
    // Pour la data table
    displayedColumns: string[] = ['id', 'name', 'email', 'picture'];
  
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
    this.getTeachers();
  }

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);
   
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getTeachers();
  }

  premierePage() {
    this.page = 1;
    this.getTeachers();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getTeachers();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getTeachers();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getTeachers();
  }

  getTeachers() {
    console.log("On va chercher les students dans le service");

    this.teachersService.getTeachers(this.page, this.limit)
    .subscribe(data => {
      this.teachers = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("Teachers reçus");
    });
  }
}
