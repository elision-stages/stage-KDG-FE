import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import staticRandomInt from "../../../helpers/staticRandomInt";
import {ProductService} from "../../../service/product.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-add-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  loading: boolean = true;

  product: any;
  images: any;

  attributes: any;

  breadcrumb: MenuItem[]
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'}

  random: Function = staticRandomInt();
  amount: number = 1;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
    this.route.params.subscribe( params => this.loadProduct(params['id']) );
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => {
        this.loading = false
        this.product = product
        this.images = product['images'].map(img => {
          return {
            "previewImageSrc": img,
            "thumbnailImageSrc": img
          }
        })
        this.generateBreadcrumb()
      },
      error: _error => {
        this.router.navigate(['pages/notfound'])
      }
    })
  }

  private generateBreadcrumb() {
    this.breadcrumb = []
    let category = this.product.category;
    while(category) {
      this.breadcrumb.push({
        routerLink: '/category/' + category.id,
        label: category.name
      })
      category = category.parent
    }
    this.breadcrumb.reverse()
    this.breadcrumb.push({label: this.product.name})
  }

  updateAmount(btn: string) {
    this.amount += (btn == 'up' ? 1 : -1)
    this.amount = Math.min(100, this.amount)
    this.amount = Math.max(1, this.amount)
  }
}
