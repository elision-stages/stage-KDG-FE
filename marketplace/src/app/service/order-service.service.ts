import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../model/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  orderUrl: string = environment.api

  constructor(private http : HttpClient) {
  }

  getVendorOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.orderUrl + 'myOrders')
  }
}
