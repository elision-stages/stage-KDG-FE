import {OrderLine} from "./OrderLine";

export class Cart {
  orderLines: OrderLine[] = []
  totalPrice: number = 0
}
