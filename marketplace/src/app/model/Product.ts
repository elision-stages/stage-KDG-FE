import {AttributeValue} from "./AttributeValue";
import {Category} from "./Category";

export class Product {
  id: number
  title: string
  price: number
  categoryId: number
  description: string
  images: string[]
  attributes: Array<AttributeValue>
  category: Category
  vendorId: number
  vendorName: string

  constructor() {
    this.attributes = new Array<AttributeValue>()
  }

}

