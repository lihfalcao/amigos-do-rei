import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { AMIGOS_API } from '../app.api';
import { LoginService } from './login.service';
import { map, mergeMap } from 'rxjs/operators';
import { User } from '../login/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getProfessor(): Observable<any> {
    const loggedInUser = this.loginService.getUser();

    if (!loggedInUser) {
      return of([]);
    }
    const userObservable = this.http
      .get<User[]>(`${AMIGOS_API}/users?username=${loggedInUser.username}`)
      .pipe(map(users => (users.length > 0 ? users[0] : undefined)));

    return userObservable.pipe(
      mergeMap(user => {
        if (!user) {
          return of([]);
        }

        const classesUrl = `${AMIGOS_API}/classes`;
        const professorUrl = `${AMIGOS_API}/professors/${user.professorId}`;

        return forkJoin([
          this.http.get<any>(professorUrl),
          this.http.get<any[]>(classesUrl)
        ]).pipe(
          map(([professor, classes]) => {
            if (!professor || !Array.isArray(classes)) {
              console.error('Invalid response format for professor or classes');
              return [];
            }

            const classInfo = classes.find((c: any) => c.id === professor.classId);

            return {
              ...professor,
              className: classInfo ? classInfo.name : null
            };
          })
        );
      })
    );
  }

  getProfessors(){
    return this.http.get<any[]>(`${AMIGOS_API}/professors`)
  }
}
