import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {VATBusiness} from "../model/VATBusiness";

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private vendorUrl: string = environment.api + 'vendor/'

  constructor(private http: HttpClient) { }

  checkVat(vat: string, test?: number): Observable<VATBusiness> {
    return this.http.get<VATBusiness>(this.vendorUrl + 'vat/' + vat);
  }
}
