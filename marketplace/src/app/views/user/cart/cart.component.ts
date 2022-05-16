import { Component, OnInit } from '@angular/core';
import {Cart} from "../../../model/Cart";
import {Router} from "@angular/router";
import {CartService} from "../../../service/cart.service";
import {OrderLine} from "../../../model/OrderLine";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart: Cart = new Cart();

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart.subscribe(x => this.cart = x);
  }

  updateCart(orderline: OrderLine, quantity: any) {
    console.log(orderline, quantity)
    this.cartService.updateCart(orderline.productDto.id, quantity).subscribe()
  }
}
