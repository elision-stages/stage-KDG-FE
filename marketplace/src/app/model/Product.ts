import {AttributeValue} from "./AttributeValue";
import {Category} from "./Category";

export class Product {
  id: number
  title: string
  price: number
  description: string
  vendorId: number
  attributes: Array<AttributeValue>
  category: Category

  constructor() {
    this.attributes = new Array<AttributeValue>()
  }

}

