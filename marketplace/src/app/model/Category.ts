export class Category {
  name: string
  parentId: number
  characteristics: Array<Characteristic>
}

export class Characteristic {
  enumValues: Array<string>
  name: string
  required: boolean
  type: string
  value: any
}
