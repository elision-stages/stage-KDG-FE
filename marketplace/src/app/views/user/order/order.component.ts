import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {MenuItem} from "primeng/api";
import {OrderService} from "../../../service/order.service";
import {User} from "../../../model/User";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  loading: boolean = true;

  order: any = []

  breadcrumb: MenuItem[] = [{ routerLink: '/orders', label: 'Orders' }, { label: 'Loading...' }]
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'}

  user: User = null

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService) {
    this.route.params.subscribe( params => this.loadOrder(params['id']) );
    this.user = authService.userValue
  }

  loadOrder(id: number) {
    this.breadcrumb[1].label = 'Order #' + id
    this.orderService.getOrderById(id).subscribe({
      next: order => {
        this.loading = false
        this.order = order
      },
      error: _error => {
        this.router.navigate(['pages/notfound'])
      }
    })
  }
}
