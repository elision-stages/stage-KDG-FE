import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Cart} from "../model/Cart";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl: string = environment.api + 'cart/'

  private cartSubject: BehaviorSubject<Cart>;
  public cart: Observable<Cart>;

  constructor(private http: HttpClient) {
    this.cartSubject = new BehaviorSubject<Cart>(null);
    this.cart = this.cartSubject.asObservable();
  }

  update() {
    this.handleCart(this.http.get<Cart>(this.cartUrl))
  }

  handleCart(request: Observable<Cart>) {
    request.subscribe({
      next: (cart) => {
        this.cartSubject.next(cart);
        console.log(cart)
      }
    })
  }

  addToCart(productId: number, amount = 1): Observable<Cart> {
    let url = this.cartUrl + 'add';
    let request = this.http.post<Cart>(url, { productId: productId, count: amount });
    this.handleCart(request)
    return request
  }
}
