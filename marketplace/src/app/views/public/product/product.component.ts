import {AfterViewChecked, AfterViewInit, Component, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import staticRandomInt from "../../../helpers/staticRandomInt";
import {ProductService} from "../../../service/product/product.service";
import {ConfirmationService, MenuItem} from "primeng/api";
import {AuthService} from "../../../service/user/auth.service";
import {CartService} from "../../../service/user/cart.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './product.component.html',
  providers: [ConfirmationService],
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit {
  loading: boolean = true;

  product: any;

  attributes: any;

  breadcrumb: MenuItem[]
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'}

  random: Function = staticRandomInt();
  amount: number = 1;

  user: any = null
  math = Math

  constructor(
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private authService: AuthService) {
    this.route.params.subscribe( params => this.loadProduct(params['id']) );
    this.user = authService.userValue
  }

  ngAfterViewInit() {
    if(document.getElementById('magicthumb') == null) {
      var s = document.createElement("script")
      s.id = 'magicthumb'
      s.type = "text/javascript"
      s.src = "../assets/magicthumb/magicthumb.js"
      s.onload = this.updateGallery;
      this.elementRef.nativeElement.appendChild(s)
    }
  }

  updateGallery() {
    if(window['MagicThumb']) {
      if(!window['MagicThumb'].refresh('productList')) {
        console.error('Refreshing failed, trying again...')
        setTimeout(this.updateGallery, 50)
      }
    }else{
      console.error('No magicthumb found, trying again...')
      setTimeout(this.updateGallery, 50)
    }
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: product => {
        this.loading = false
        this.product = product
        this.generateBreadcrumb()
        setTimeout(this.updateGallery, 50)
      },
      error: _error => {
        this.router.navigate([`pages/notfound`], { replaceUrl: true });
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
