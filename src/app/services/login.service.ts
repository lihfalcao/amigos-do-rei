import { Injectable } from "@angular/core";
import { User } from "../login/user.model";
import { Observable, of } from "rxjs";

@Injectable()
export class LoginService {
    private readonly localStorageKey = 'loggedInUser';

    user: User | undefined;

    constructor() {
        const storedUser = localStorage.getItem(this.localStorageKey);
        this.user = storedUser ? JSON.parse(storedUser) : undefined;
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    getUser(): User | undefined {
        return this.user;
    }

    login(data: any): Observable<User> {
        const fakeUser: User = { id:data.id, username: data.username, password: data.password, professorId: data.professorId };

        this.user = fakeUser;

        localStorage.setItem(this.localStorageKey, JSON.stringify(fakeUser));

        return of(fakeUser);
    }

    logout() {
        this.user = undefined;
        localStorage.removeItem(this.localStorageKey);
    }
}
