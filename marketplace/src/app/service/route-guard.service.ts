import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) { }

  public canActivate(route: ActivatedRouteSnapshot){
    const loggedIn = this.authService.userValue !== null;
    if(!loggedIn) {
      this.router.navigate(['pages/access']);
      return false
    }
    return true
  }
}
