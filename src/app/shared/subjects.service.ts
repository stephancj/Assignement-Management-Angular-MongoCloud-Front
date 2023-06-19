import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Subject } from '../subjects/Subject.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
assignments:Subject[] = []
  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    uri_api = 'http://localhost:8010/api/subjects';
    // uri_api = 'https://mbds-madagascar-2022-2023-back-end.onrender.com/api/assignments';

  getSubjects(page:number, limit:number):Observable<any> {
    return this.http.get<Subject[]>(this.uri_api + "?page=" + page + "&limit=" + limit);
  }

  getSubject(id:number):Observable<Subject|undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http.get<Subject|undefined>(`${this.uri_api}/${id}`)
   
    .pipe(
      map(a => {
        if(a) {
          a.name += " MAP MAP MAP";
        }
        return a;
      }),
      tap(a => {
        if(a)
          console.log("ICI DANS LE TAP " + a.name)
      }),
      map(a => {
        if(a) {
          a.name += " TOTOTOTO";
        }
        return a;
      }),
      catchError(this.handleError<Subject>("Erreur dans le traitement de subject avec id = " + id))
    )
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
}
