import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/Product";
import {Table} from "primeng/table";
import {ConfirmationService} from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ConfirmationService]
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filterKeyword: String = '';

  loading: boolean = true;

  constructor(private router: Router, private productService: ProductService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.productService.getMyProducts().subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }

  clear(table: Table) {
    table.clear();
  }

  filter(table: Table, $event: Event) {
    this.filterKeyword = ($event.target as HTMLInputElement).value
    table.filterGlobal(this.filterKeyword, 'contains')
  }

  editProduct(product: Product) {
    this.router.navigate(['/product', product.id, '/edit'])
  }

  deleteProduct(product: Product, $event: Event) {
    this.confirmationService.confirm({
      target: $event.target,
      message: 'Are you sure that you want to delete this add-product?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'none',
      rejectIcon: 'pi pi-chevron-left\n',
      acceptIcon: 'pi pi-trash',
      accept: () => {
        this.products = this.products.filter(function( obj ) {
          return obj.id !== product.id;
        });
      }
    });
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product', product.id])
  }

  addProduct() {
    this.router.navigate(['/addProduct'])
  }
}
