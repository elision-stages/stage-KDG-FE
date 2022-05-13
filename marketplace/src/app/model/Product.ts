import {AttributeValue} from "./AttributeValue";
import {Category} from "./Category";

export class Product {
  id: number
  title: string
  price: number
  categoryId: number
  description: string
  attributes: Array<AttributeValue>
  category: Category

  constructor() {
    this.attributes = new Array<AttributeValue>()
  }

}

