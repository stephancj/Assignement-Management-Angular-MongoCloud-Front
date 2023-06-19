import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Student } from '../students/student.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
assignments:Student[] = []
  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    uri_api = 'http://localhost:8010/api/students';
    // uri_api = 'https://mbds-madagascar-2022-2023-back-end.onrender.com/api/assignments';

  getStudents(page:number, limit:number):Observable<any> {
    return this.http.get<Student[]>(this.uri_api + "?page=" + page + "&limit=" + limit);
  }

  getStudent(id:number):Observable<Student|undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http.get<Student|undefined>(`${this.uri_api}/${id}`)
   
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
      catchError(this.handleError<Student>("Erreur dans le traitement de assignment avec id = " + id))
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
