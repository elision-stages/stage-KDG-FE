import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../../service/product/product.service";
import {Product} from "../../../../model/Product";
import {Table} from "primeng/table";
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/user/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filterKeyword: string = '';

  loading: boolean = true;
  apiModal: boolean = false;
  apiKey: string = '•'.repeat(32);

  constructor(private router: Router, private productService: ProductService, private authService: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
    this.router.navigate(['product', product.id, 'edit'])
  }

  deleteProduct(product: Product, $event: Event) {
    this.confirmationService.confirm({
      target: $event.target,
      message: 'Are you sure that you want to delete this product?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'none',
      rejectIcon: 'pi pi-chevron-left\n',
      acceptIcon: 'pi pi-trash',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe(() => {
          this.products = this.products.filter(function( obj ) {
            return obj.id !== product.id;
          });
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

  openApiModal() {
    this.apiModal = true
  }

  refreshApi($event: Event) {
    this.confirmationService.confirm({
      target: $event.target,
      message: 'Refreshing the API token will render the previous token unusable. Are you sure you want to do this?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'none',
      rejectIcon: 'pi pi-chevron-left\n',
      acceptIcon: 'pi pi-refresh',
      accept: () => {
        this.authService.refreshApi().subscribe((data) => {
          console.log(data)
          this.apiKey = data.token
        });
      }
    });
  }

  copyToken() {

    navigator.clipboard.writeText(this.apiKey).then(() => {
      this.messageService.add({severity:'success', summary: 'Clipboard', detail: 'Copied token to clipboard'});
    });
  }
}
