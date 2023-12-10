import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "./user.model";


@Injectable()
export class LoginService {

    user: User | undefined


    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    getUser(){
        return this.user;
    }

    login(data:any): Observable<User> {
        return this.user=data.username
    }

    logout(){
        this.user = undefined
    }


}