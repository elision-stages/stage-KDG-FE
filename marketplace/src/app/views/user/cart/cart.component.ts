import { Component, OnInit } from '@angular/core';
import {Product} from "../../../model/Product";
import {Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Product[] = [];

  loading: boolean = true;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getMyProducts().subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }

  get totalPrice() {
    return this.products.reduce((a, b) => +a + +b.price, 0);
  }
}
