import {Characteristic} from "./Characteristic";

export class Category {
  id: number
  name: string
  parentId: number
  characteristics: Array<Characteristic>
}

