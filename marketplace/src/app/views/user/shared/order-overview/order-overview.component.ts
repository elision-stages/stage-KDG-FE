import {Component, OnInit} from '@angular/core';
import {Order} from "../../../../model/Order";
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {OrderServiceService} from "../../../../service/order-service.service";
import {AuthService} from "../../../../service/user/auth.service";

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html'
})
export class OrderOverviewComponent implements OnInit {
  orders: Order[] = [];
  columns = []

  loading: boolean;
  filterKeyword: string = '';

  constructor(private router: Router, private orderService: OrderServiceService, private authService: AuthService) {
    this.selectColumns();
  }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getVendorOrders().subscribe(orders => {
      this.orders = orders;
      console.log('orders', orders)
      this.loading = false;
    })
  }

  filter(table: Table, $event: Event) {
    this.filterKeyword = ($event.target as HTMLInputElement).value
    table.filterGlobal(this.filterKeyword, 'contains')
  }

  viewOrder(order: Order) {
    this.router.navigate(['/product', order.orderNumber])
  }

  private selectColumns() {
    this.columns.push(
      {name: 'orderDate', value: 'date'},
      {name: 'orderNumber', value: 'string'})
    if (this.authService.userValue.role !== 'customer') this.columns.push({name: 'customerName', value: 'string'})

    this.columns.push(
      {name: 'numberProducts', value: 'string'},
      {name: 'totalPrice', value: 'currency'})
  }
}
