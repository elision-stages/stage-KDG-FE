import {AttributeValue} from "./AttributeValue";

export class Product {
  id: number
  title: string
  price: number
  categoryId: number
  description: string
  attributes: Array<AttributeValue>

  constructor() {
    this.attributes = new Array<AttributeValue>()
  }

}

