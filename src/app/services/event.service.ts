import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AMIGOS_API } from "../app.api";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "./login.service";
import { forkJoin } from 'rxjs';
import { User } from "../login/user.model";

@Injectable()
export class EventService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) {}

  getEventsForLoggedInUser(): Observable<any[]> {
    const loggedInUser = this.loginService.getUser();

    if (!loggedInUser) {
      return of([]); 
    }
  
    const userObservable = this.http.get<User[]>(`${AMIGOS_API}/users?username=${loggedInUser.username}`).pipe(
      map(users => users.length > 0 ? users[0] : undefined)
    );

    return userObservable.pipe(
      mergeMap(user => {
        if (!user) {
          return of([]);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const eventsUrl = `${AMIGOS_API}/events?professorId=${user.professorId}&startDate=${today.toISOString()}`;
        const professorsUrl = `${AMIGOS_API}/professors/${user.professorId}`;
        const classesUrl = `${AMIGOS_API}/classes`;
        const themesUrl = `${AMIGOS_API}/themes`;
        

        return forkJoin([
          this.http.get<any[]>(eventsUrl),
          this.http.get<any[]>(professorsUrl),
          this.http.get<any[]>(classesUrl),
          this.http.get<any[]>(themesUrl)
        ]).pipe(
          map(([events, professors, classes, themes]) => {
            const professorsArray = Array.isArray(professors) ? professors : [professors];

            const upcomingEvents = events.filter((event: any) => new Date(event.date) > today);

             return upcomingEvents.map((event: any) => {
                const professor = professorsArray.find((p: any) => p.id === event.professorId);
                const classInfo = classes.find((c: any) => c.id === event.classId);
                const themeInfo = themes.find((t: any) => t.id === event.themeId);


              return {
                ...event,
                professorName: professor ? professor.name : null,
                className: classInfo ? classInfo.name : null,
                classColor: classInfo ? classInfo.color : null,
                themeName: themeInfo ? themeInfo.themeName : null,
                themeContent: themeInfo ? themeInfo.content : null,
                themeResume: themeInfo ? themeInfo.resume : null
              };
            });
          }),
          catchError(this.handleError<any[]>("getEventsForLoggedInUser", []))
        );
      })
    );
  }

  getPassedEventsByProfessor(id: number){
     const today = new Date();
        today.setHours(0, 0, 0, 0); 

    const eventsUrl = `${AMIGOS_API}/events?professorId=${id}&startDate=${today.toISOString()}`;
    const professorsUrl = `${AMIGOS_API}/professors/${id}`;
    const classesUrl = `${AMIGOS_API}/classes`;
    const themesUrl = `${AMIGOS_API}/themes`;
    

    return forkJoin([
      this.http.get<any[]>(eventsUrl),
      this.http.get<any[]>(professorsUrl),
      this.http.get<any[]>(classesUrl),
      this.http.get<any[]>(themesUrl)
    ]).pipe(
      map(([events, professors, classes, themes]) => {
        const professorsArray = Array.isArray(professors) ? professors : [professors];

        const upcomingEvents = events.filter((event: any) => new Date(event.date) < today);

          return upcomingEvents.map((event: any) => {
            const professor = professorsArray.find((p: any) => p.id === event.professorId);
            const classInfo = classes.find((c: any) => c.id === event.classId);
            const themeInfo = themes.find((t: any) => t.id === event.themeId);


          return {
            ...event,
            professorName: professor ? professor.name : null,
            className: classInfo ? classInfo.name : null,
            classColor: classInfo ? classInfo.color : null,
            themeName: themeInfo ? themeInfo.themeName : null,
            themeContent: themeInfo ? themeInfo.content : null,
            themeResume: themeInfo ? themeInfo.resume : null
          };
        });
      }),
      catchError(this.handleError<any[]>("getEventsForLoggedInUser", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getTheme(id: any){
    return this.http.get<any[]>(`${AMIGOS_API}/themes/${id}`)
  }

  getClasses(){
    return this.http.get<any[]>(`${AMIGOS_API}/classes`)
  }

  getThemes(){
    return this.http.get<any[]>(`${AMIGOS_API}/themes`)
  }

  saveTheme(data: { themeName: any; content: any; resume: any; }){
    return this.http.post<any[]>(`${AMIGOS_API}/themes`, data)
  }

  saveEvent(data: { date: any; professorId: any; classId: any; themeId: any; }){
    return this.http.post<any[]>(`${AMIGOS_API}/events`, data)
  }
}
