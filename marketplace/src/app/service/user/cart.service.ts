import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {Cart} from "../../model/Cart";

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
    this.update()
  }

  update() {
    let url = this.cartUrl + 'get';
    this.handleCart(this.http.get<Cart>(url)).subscribe()
  }

  handleCart(request: Observable<Cart>) {
    return request.pipe(
      tap(cart => {
        this.cartSubject.next(cart);
      })
    )
  }

  addToCart(productId: number, amount = 1): Observable<Cart> {
    let url = this.cartUrl + 'add';
    return this.handleCart(this.http.post<Cart>(url, { productId: productId, count: amount, add: true }))
  }

  updateCart(productId: number, amount = 1): Observable<Cart> {
    let url = this.cartUrl + 'add';
    return this.handleCart(this.http.post<Cart>(url, { productId: productId, count: amount, add: false }))
  }

  order() {
    let url = this.cartUrl + 'checkout';
    return this.http.get<number>(url)
  }
}
