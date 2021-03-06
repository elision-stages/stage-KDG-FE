import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VATBusiness} from "../../model/VATBusiness";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private vendorUrl: string = environment.api + 'vendor/'

  constructor(private http: HttpClient) { }

  checkVat(vat: string): Observable<VATBusiness> {
    return this.http.get<VATBusiness>(this.vendorUrl + 'vat/' + vat);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(environment.api + 'register/vendor', user)
  }

  getVendor(id: number): Observable<any> {
    return this.http.get<any>(this.vendorUrl + id);
  }
}
