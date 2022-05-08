import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = environment.api + 'auth/'

  constructor(private http: HttpClient) { }

  login(mail: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl + 'login', { email: mail, password: password }, {
      withCredentials: true
    });
  }
}
