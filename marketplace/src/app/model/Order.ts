
export class SmallOrder {
  orderDate: string
  orderNumber: string
  customerName: string
  numberProducts: string
  totalPrice: string

import {OrderLine} from "./OrderLine";

export class Order {
  id: number
  lines: OrderLine[]
  totalPrice: number
}
