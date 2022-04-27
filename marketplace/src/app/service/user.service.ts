import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string = environment.api + 'user/'

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + id)
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user)
  }
}
