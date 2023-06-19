import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    return this.http.get<Teacher|undefined>(`${this.uri_api}/${id}`)
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
}
