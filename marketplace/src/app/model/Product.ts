import {AttributeValue} from "./AttributeValue";

export class Product {
  id: number
  title: string
  price: number
  description: string
  vendorId: number
  attributes: Array<AttributeValue>

  constructor() {
    this.attributes = new Array<AttributeValue>()
  }

}

