import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = environment.api + 'auth/'

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(mail: string, password: string): Observable<User> {
    return this.http.post<any>(this.authUrl + 'login', { email: mail, password: password }).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.router.navigate(['/']);
        return user
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
