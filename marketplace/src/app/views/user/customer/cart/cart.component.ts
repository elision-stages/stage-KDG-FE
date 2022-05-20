import { Component, OnInit } from '@angular/core';
import {Cart} from "../../../../model/Cart";
import {Router} from "@angular/router";
import {CartService} from "../../../../service/user/cart.service";
import {OrderLine} from "../../../../model/OrderLine";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [MessageService]
})
export class CartComponent implements OnInit {

  cart: Cart = new Cart();

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart.subscribe(x => { this.cart = x; console.log(x) });
  }

  updateCart(orderline: OrderLine, quantity: any) {
    this.cartService.updateCart(orderline.product.id, quantity).subscribe()
  }

  placeOrder() {
    this.cartService.order().subscribe({
      next: orderId => {
        this.cartService.update()
        this.router.navigate(['order', orderId])
      }
    })
  }
}
