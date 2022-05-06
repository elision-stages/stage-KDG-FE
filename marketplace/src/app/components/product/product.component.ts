import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Pair, Product} from "../../model/Product";
import {CategoryService} from "../../service/category.service";
import {Category, Characteristic} from "../../model/Category";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
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

  ngOnInit(): void {
  }

  /**
   *
   */
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
        for (let i = 0; i < _result.length; i++) {
          this.categories.push(_result[i])
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

    for (let i = 0; i < this.selectedCategory.characteristics.length; i++) {
      let pair = new Pair();
      pair.attributeName = this.selectedCategory.characteristics[i].name;
      pair.attributeValue = ''
      this.outProduct.attributes.push(pair)
    }
    console.log(this.outProduct);
  }

  characteristicChanged(characteristic: Characteristic, value:any) {
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
