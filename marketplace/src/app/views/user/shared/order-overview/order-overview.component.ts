import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {OrderServiceService} from "../../../../service/order-service.service";
import {AuthService} from "../../../../service/user/auth.service";
import {SmallOrder} from "../../../../model/SmallOrder";

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html'
})
export class OrderOverviewComponent implements OnInit {
  orders: SmallOrder[] = [];
  columns = []

  loading: boolean;
  filterKeyword: string = '';

  constructor(private router: Router, private orderService: OrderServiceService, private authService: AuthService) {
    this.selectColumns();
  }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getUserOrders().subscribe(orders => {
      this.orders = orders;
      this.loading = false;
    })
  }

  filter(table: Table, $event: Event) {
    this.filterKeyword = ($event.target as HTMLInputElement).value
    table.filterGlobal(this.filterKeyword, 'contains')
  }

  viewOrder(order: SmallOrder) {
    this.router.navigate(['/order', order.orderNumber])
  }

  private selectColumns() {
    this.columns.push(
      {name: 'orderDate', value: 'date', text: 'Date'},
      {name: 'orderNumber', value: 'string', text: 'Order number'})
    if (this.authService.userValue.role !== 'customer') this.columns.push({name: 'customerName', value: 'string', text: 'Customer'})

    this.columns.push(
      {name: 'numberProducts', value: 'string', text: '# of products'},
      {name: 'totalPrice', value: 'currency', text: 'Price'})
  }
}
