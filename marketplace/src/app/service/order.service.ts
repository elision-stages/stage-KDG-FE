import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/Product";
import {environment} from "../../environments/environment";
import {Order} from "../model/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(environment.api + 'order/' + orderId);
  }
}
