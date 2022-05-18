import {Component, OnInit} from '@angular/core';
import {Order} from "../../../../model/Order";
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {OrderServiceService} from "../../../../service/order-service.service";

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent implements OnInit {
  orders: Order[] = [];
  columns = [
    {name: 'orderDate', value: 'string'},
    {name: 'orderNumber', value: 'string'},
    {name: 'customerName', value: 'string'},
    {name: 'numberProducts', value: 'string'},
    {name: 'totalPrice', value: 'currency'}]

  loading: boolean;
  filterKeyword: string = '';

  constructor(private router: Router, private orderService: OrderServiceService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getVendorOrders().subscribe(orders => {
      this.orders = orders;
      console.log(orders)
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

}
