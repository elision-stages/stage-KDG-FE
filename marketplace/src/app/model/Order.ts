import {OrderLine} from "./OrderLine";

export class Order {
  id: number
  lines: OrderLine[]
  totalPrice: number
}
