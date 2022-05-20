import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SmallOrder} from "../model/SmallOrder";

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  orderUrl: string = environment.api

  constructor(private http : HttpClient) {
  }

  getUserOrders(): Observable<SmallOrder[]>{
    return this.http.get<SmallOrder[]>(this.orderUrl + 'order')
  }
}
