import { Component } from '@angular/core';
import { AppMainComponent } from '../main/app.main.component';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import {User} from "../../model/User";
import {AuthService} from "../../service/auth.service";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent {
  items: MenuItem[] = [];
  showCategories: boolean = false;
  megaMenuItems: MegaMenuItem[];

  user: User = null
  cartCount: number = 0

  constructor(public appMain: AppMainComponent, private authService: AuthService, private cartService: CartService) {
    this.authService.user.subscribe(x => this.user = x);
    this.authService.user.subscribe(this.setItems.bind(this));
    this.cartService.cart.subscribe(cart => this.cartCount = cart ? cart.orderLines.length : 0)
  }

  ngOnInit() {
    this.megaMenuItems = [
      {
        label: 'Fashion', icon: 'pi pi-fw pi-tag',
        items: [
          [
            {
              label: 'Women',
              items: [{label: 'Women Item'}, {label: 'Women Item'}, {label: 'Women Item'}]
            },
            {
              label: 'Men',
              items: [{label: 'Men Item'}, {label: 'Men Item'}, {label: 'Men Item'}]
            }
          ],
          [
            {
              label: 'Kids',
              items: [{label: 'Kids Item'}, {label: 'Kids Item'}]
            },
            {
              label: 'Luggage',
              items: [{label: 'Luggage Item'}, {label: 'Luggage Item'}, {label: 'Luggage Item'}]
            }
          ]
        ]
      },
      {
        label: 'Electronics', icon: 'pi pi-fw pi-desktop',
        items: [
          [
            {
              label: 'Computer',
              items: [{label: 'Computer Item'}, {label: 'Computer Item'}]
            },
            {
              label: 'Camcorder',
              items: [{label: 'Camcorder Item'}, {label: 'Camcorder Item'}, {label: 'Camcorder Item'}]
            }
          ],
          [
            {
              label: 'TV',
              items: [{label: 'TV Item'}, {label: 'TV Item'}]
            },
            {
              label: 'Audio',
              items: [{label: 'Audio Item'}, {label: 'Audio Item'}, {label: 'Audio Item'}]
            }
          ],
          [
            {
              label: 'Sports.7',
              items: [{label: 'Sports.7.1'}, {label: 'Sports.7.2'}]
            }
          ]
        ]
      },
      {
        label: 'Furniture', icon: 'pi pi-fw pi-image',
        items: [
          [
            {
              label: 'Living Room',
              items: [{label: 'Living Room Item'}, {label: 'Living Room Item'}]
            },
            {
              label: 'Kitchen',
              items: [{label: 'Kitchen Item'}, {label: 'Kitchen Item'}, {label: 'Kitchen Item'}]
            }
          ],
          [
            {
              label: 'Bedroom',
              items: [{label: 'Bedroom Item'}, {label: 'Bedroom Item'}]
            },
            {
              label: 'Outdoor',
              items: [{label: 'Outdoor Item'}, {label: 'Outdoor Item'}, {label: 'Outdoor Item'}]
            }
          ]
        ]
      },
      {
        label: 'Sports', icon: 'pi pi-fw pi-star',
        items: [
          [
            {
              label: 'Basketball',
              items: [{label: 'Basketball Item'}, {label: 'Basketball Item'}]
            },
            {
              label: 'Football',
              items: [{label: 'Football Item'}, {label: 'Football Item'}, {label: 'Football Item'}]
            }
          ],
          [
            {
              label: 'Tennis',
              items: [{label: 'Tennis Item'}, {label: 'Tennis Item'}]
            }
          ]
        ]
      },
    ];
  }
  setItems() {
    this.items = []
    if(this.user?.role == 'vendor') {
      this.items.push({
        label: 'Hi, ' + this.user?.firstName,
        items: [{
          label: 'Products',
          icon: 'pi pi-shopping-bag',
          routerLink: '/products'
        }
        ]})
    }
    if(this.user?.role == 'admin') {
      this.items.push({
        label: 'Admin',
        items: [{
          label: 'Categories',
          icon: 'pi pi-sitemap',
          routerLink: '/categories'
        }
        ]})
    }
    this.items.push({
      label: 'Hi, ' + this.user?.firstName,
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          routerLink: '/settings'
        },
        {
          label: 'Log out',
          icon: 'pi pi-sign-out',
          command: this.authService.logout.bind(this.authService)
        }
      ]})
  }
}
