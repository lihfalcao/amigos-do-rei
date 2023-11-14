import { Injectable } from "@angular/core";
import { HttpClient, HttpParams} from "@angular/common/http";
import { User } from "./user.model";
import { Observable } from "rxjs";
import { AMIGOS_API } from "../app.api";


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



}