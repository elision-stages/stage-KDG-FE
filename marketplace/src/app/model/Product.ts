export class Product {
  price: number
  description: string
  vendorId: number
  attributes: Array<Pair>
}

export class Pair {
  attributeName: string
  attributeValue: string
}
