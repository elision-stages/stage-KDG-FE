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

export class ProductDto {
  id: number
  title: string
  price: number
  categoryId: number
  description: string
  images: string[]
  attributes: Array<AttributeValue>
  vendorId: number


  constructor(id: number, title: string, price: number, categoryId: number, description: string, images: string[], attributes: Array<AttributeValue>, vendorId: number) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.categoryId = categoryId;
    this.description = description;
    this.images = images;
    this.attributes = attributes;
    this.vendorId = vendorId;
  }
}

