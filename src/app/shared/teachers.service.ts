import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Teacher } from '../teachers/teacher.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
assignments:Teacher[] = []
  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    uri_api = 'http://localhost:8010/api/teachers';
    // uri_api = 'https://mbds-madagascar-2022-2023-back-end.onrender.com/api/assignments';

  getTeachers(page:number, limit:number):Observable<any> {
    return this.http.get<Teacher[]>(this.uri_api + "?page=" + page + "&limit=" + limit);
  }

  getTeacher(id:number):Observable<Teacher|undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http.get<Teacher|undefined>(`${this.uri_api}/${id}`)
   
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
      catchError(this.handleError<Teacher>("Erreur dans le traitement de teacher avec id = " + id))
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
