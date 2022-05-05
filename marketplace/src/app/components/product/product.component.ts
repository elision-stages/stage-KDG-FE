import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Pair, Product} from "../../model/Product";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  addProduct = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required])
  })

  constructor(private productService: ProductService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }

  /**
   *
   */
  onAdd(): void {
    console.log("add")

    let product: Product
    product = new Product()
    product.price = 2
    product.description = "testing product"
    product.vendorId = 3

    console.log(this.addProduct.value);

    let pair: Pair
    pair = new Pair()
    pair.attributeName = "first"
    pair.attributeValue = "100"

    product.attributes = new Array<Pair>()
    product.attributes.push(pair)

    this.productService.addProduct(product).subscribe({
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
        console.log(_result);
        return _result;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
