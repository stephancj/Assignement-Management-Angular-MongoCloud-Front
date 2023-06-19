import { Component } from '@angular/core';
import { SubjectsService } from '../shared/subjects.service';
import { TeachersService } from '../shared/teachers.service';
import { Subject } from './Subject.model';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  constructor(private subjectsService:SubjectsService, private teachersService: TeachersService) { }

    // les données à afficher
    subjects:Subject[] = [];
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
    this.getSubjects();
  }

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);
   
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getSubjects();
  }

  premierePage() {
    this.page = 1;
    this.getSubjects();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getSubjects();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getSubjects();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getSubjects();
  }

  getSubjects() {
    console.log("On va chercher les subjects dans le service");

    this.subjectsService.getSubjects(this.page, this.limit)
    .subscribe(data => {
      this.subjects = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("Subjects reçues");
    });
  }
}
