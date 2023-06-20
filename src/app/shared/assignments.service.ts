import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
// tableau de devoirs à rendre
assignments:Assignment[] = []
  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    // uri_api = 'http://localhost:8010/api/assignments';
    uri_api = 'https://nomena58-stephan11-assigment-ws.onrender.com/api/assignments';

  getAssignments(page:number, limit:number):Observable<any> {
    // normalement on doit envoyer une requête HTTP
    // sur un web service, et ça peut prendre du temps
    // On a donc besoin "d'attendre que les données arrivent".
    // Angular utilise pour cela la notion d'Observable
    return this.http.get<Assignment[]>(this.uri_api + "?page=" + page + "&limit=" + limit);
    
    // of() permet de créer un Observable qui va
    // contenir les données du tableau assignments
    //return of(this.assignments);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http.get<Assignment|undefined>(`${this.uri_api}/${id}`)
    
    // On va chercher dans le tableau des assignments
    // l'assignment dont l'id est celui passé en paramètre
    
    //const assignment = this.assignments.find(a => a.id === id);
    // on retourne cet assignment encapsulé dans un Observable
    //return of(assignment);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 
  addAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, 'ajouté');

    // plus tard on utilisera un web service pour l'ajout dans une vraie BD
    return this.http.post<Assignment>(this.uri_api, assignment);
    // on ajoute le devoir au tableau des devoirs
    //this.assignments.push(assignment);
    // on retourne un message de succès à travers
    // un Observable
    //return of(`Assignment ${assignment.nom} ajouté avec succès`);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // Normalement : on appelle un web service pour l'update des
    // données
    return this.http.put<Assignment>(this.uri_api, assignment);

    // dans la version tableau : rien à faire (pourquoi ? Parceque assignment
    // est déjà un élément du tableau this.assignments)

    //this.loggingService.log(assignment.nom, 'modifié');

    //return of(`Assignment ${assignment.nom} modifié avec succès`)
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    return this.http.delete(this.uri_api + "/" + assignment._id)
  }
}
