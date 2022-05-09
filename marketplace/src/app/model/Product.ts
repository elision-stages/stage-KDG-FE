import {AttributeValue} from "./AttributeValue";

export class Product {
  title: string
  price: number
  description: string
  vendorId: number
  attributes: Array<AttributeValue>

  constructor() {
    this.attributes = new Array<AttributeValue>()
  }

}

