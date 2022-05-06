export class Product {
  title: string
  price: number
  description: string
  vendorId: number
  attributes: Array<Pair>

  constructor() {
    this.attributes = new Array<Pair>()
  }

}

export class Pair {
  attributeName: string
  attributeValue: string
}
