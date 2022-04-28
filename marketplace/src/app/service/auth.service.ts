import { Injectable } from '@angular/core';
import {catchError, map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = environment.api + 'auth/'

  constructor(private http: HttpClient) { }

  login(mail: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(this.authUrl, { mail: mail, password: password }).pipe(
      map(data => {
        console.log(data)
        return data
      })
    );
  }
}
