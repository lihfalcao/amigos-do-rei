import { AMIGOS_API } from "../app.api";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {}

  getEventsWithProfessors(): Observable<any[]> {
    const eventsUrl = `${AMIGOS_API}/events`;
    const professorsUrl = `${AMIGOS_API}/professors`;
    const classesUrl = `${AMIGOS_API}/classes`;
    const themeUrl = `${AMIGOS_API}/themes`;


    return forkJoin([
        this.http.get<any[]>(eventsUrl),
        this.http.get<any[]>(professorsUrl),
        this.http.get<any[]>(classesUrl),
      ]).pipe(
        map(([events, professors, classes]) => {
          return events.map((event: any) => {
            const professor = professors.find((p: any) => p.id === event.professorId);
            const classInfo = classes.find((c: any) => c.id === event.classId);
  
            return {
              ...event,
              professorName: professor ? professor.name : null,
              className: classInfo ? classInfo.name : null,
              classColor: classInfo ? classInfo.color : null
            };
          });
        })
      );
  }
}
