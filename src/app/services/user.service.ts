import { Injectable } from "@angular/core";
import { HttpClient, HttpParams} from "@angular/common/http";
import { User } from "../login/user.model";
import { Observable } from "rxjs";
import { AMIGOS_API } from "../app.api";
import { map } from 'rxjs/operators';


@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }


    users(search?: string): Observable<User[]> {
        let params: HttpParams = new HttpParams(); 
        
        if(search){
            params = new HttpParams().append('q', search)
        }
        return this.http.get<User[]>(`${AMIGOS_API}/users`, {params: params})
    }

    register(data?: []): Observable<User[]> {
        return this.http.post<User[]>(`${AMIGOS_API}/users`, data)
    }

    getNextEventForLoggedProfessor(): Observable<any> {
        const today = new Date().toISOString().split('T')[0];
    
        const userUrl = `${AMIGOS_API}/users`;
        const eventsUrl = `${AMIGOS_API}/events`;
        const professorsUrl = `${AMIGOS_API}/professors`;
        const classesUrl = `${AMIGOS_API}/classes`;
    
        return this.http.get<any[]>(userUrl).pipe(
          map((users) => {
            if (users.length > 0 && users[0].professorId) {
              const professorId = users[0].professorId;
    
              return this.http.get<any[]>(eventsUrl).pipe(
                map((events) => {
                  const filteredEvents = events
                    .filter((event) => event.professorId === professorId && event.date > today)
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
                  if (filteredEvents.length > 0) {
                    const nextEvent = filteredEvents[0];
    
                    const professor = this.http.get<any[]>(professorsUrl).pipe(
                      map((professors) => professors.find((p) => p.id === professorId))
                    );
    
                    const classInfo = this.http.get<any[]>(classesUrl).pipe(
                      map((classes) => classes.find((c) => c.id === nextEvent.classId))
                    );
    
                    return { ...nextEvent, professor, classInfo };
                  } else {
                    return null;
                  }
                })
              );
            } else {
              return null;
            }
          })
        );
      }



}