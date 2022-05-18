import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import staticRandomInt from "../../../helpers/staticRandomInt";
import {ProductService} from "../../../service/product/product.service";
import {ConfirmationService, MenuItem} from "primeng/api";
import {AuthService} from "../../../service/user/auth.service";
import {CartService} from "../../../service/user/cart.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './product.component.html',
  providers: [ConfirmationService]
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

  user: any = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private authService: AuthService) {
    this.route.params.subscribe( params => this.loadProduct(params['id']) );
    this.user = authService.userValue
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
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
    this.breadcrumb.push({label: this.product.title})
  }

  updateAmount(btn: string) {
    this.amount += (btn == 'up' ? 1 : -1)
    this.amount = Math.min(100, this.amount)
    this.amount = Math.max(1, this.amount)
  }

  addProduct(amount: number) {
    this.cartService.addToCart(this.product.id, amount).subscribe(_cart => {
      this.confirmationService.confirm({
        message: 'The product has succesfully been added to your shopping cart',
        icon: 'pi pi-check',
        rejectButtonStyleClass: 'p-button-secondary',
        rejectIcon: 'pi pi-arrow-left',
        acceptIcon: 'pi pi-arrow-right',
        rejectLabel: 'Continue shopping',
        acceptLabel: 'Go to shopping cart',
        accept: () => {
          this.router.navigate(['/cart'])
        }
      });
    })
  }
}
