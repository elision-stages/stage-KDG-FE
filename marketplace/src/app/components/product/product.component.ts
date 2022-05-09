import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Pair, Product} from "../../model/Product";
import {CategoryService} from "../../service/category.service";
import {Category, Characteristic} from "../../model/Category";
import {Component} from "@angular/core";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  addProduct = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('0', [Validators.required])
  })
  outProduct: Product
  categories: Array<Category>
  selectedCategory: Category
  test: any

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.getAllCategories();
    this.categories = new Array<Category>();
    this.outProduct = new Product();
  }

  onAdd(): void {
    console.log(this.addProduct.value)
    console.log(this.outProduct);

    this.outProduct.price = this.addProduct.value.price;
    this.outProduct.title = this.addProduct.value.title;
    this.outProduct.description = this.addProduct.value.description;
    this.outProduct.vendorId = 10

    this.productService.addProduct(this.outProduct).subscribe({
      next: (_result) => {
        console.log(_result);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getAllCategories(): any {
    this.categoryService.getCategories().subscribe({
      next: (_result) => {
        for (let result of _result) {
          this.categories.push(result)
        }

        return _result;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  selectCategory() {
    console.log(this.outProduct);
    this.outProduct.attributes.splice(0, this.outProduct.attributes.length)

    for (let attribute of this.selectedCategory.characteristics) {
      let pair = new Pair();
      pair.attributeName = attribute.name;
      pair.attributeValue = ''
      this.outProduct.attributes.push(pair)
    }
    console.log(this.outProduct);
  }

  characteristicChanged(characteristic: Characteristic, value: any) {
    console.log('characteristic');
    console.log(characteristic);
    console.log('value');
    console.log(value);

    if (characteristic.type === 'DECIMAL') value = Math.round(value * 100) / 100
    console.log(characteristic.value);

    for (const pair of this.outProduct.attributes) {
      if (pair.attributeName === characteristic.name) pair.attributeValue = value
    }
    console.log(this.outProduct);
  }
}
