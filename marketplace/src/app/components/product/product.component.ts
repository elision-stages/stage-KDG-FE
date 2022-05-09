import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/Product";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/Category";
import {Component} from "@angular/core";
import {MessageService} from "primeng/api";
import {Characteristic} from "../../model/Characteristic";
import {AttributeValue} from "../../model/AttributeValue";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService]
})
export class ProductComponent {
  addProduct = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('0', [Validators.required, Validators.min(0.01)])
  })
  outProduct: Product
  categories: Array<Category>
  selectedCategory: Category

  constructor(private productService: ProductService, private categoryService: CategoryService, private messageService: MessageService) {
    this.getAllCategories();
    this.categories = new Array<Category>();
    this.outProduct = new Product();
  }

  onAdd(): void {
    this.outProduct.price = this.addProduct.value.price;
    this.outProduct.title = this.addProduct.value.title;
    this.outProduct.description = this.addProduct.value.description;
    this.outProduct.vendorId = 10

    this.productService.addProduct(this.outProduct).subscribe({
      next: (result) => {
        if (result.httpCode !== '200') {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Problem adding product'
          });
          console.log(result.httpBody);
        }
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({severity: error, summary: 'Error', detail: 'Problem adding product'})
      }
    })
  }

  getAllCategories(): any {
    this.categoryService.getCategories().subscribe({
      next: (_result) => {
        this.categories = _result;
        return _result;
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({severity: error, summary: 'Error', detail: 'Problem getting categories from server'})
      }
    })
  }

  selectCategory() {
    this.outProduct.attributes.splice(0, this.outProduct.attributes.length)

    for (let attribute of this.selectedCategory.characteristics) {
      let pair = new AttributeValue();
      pair.attributeName = attribute.name;
      pair.attributeValue = ''
      this.outProduct.attributes.push(pair)
    }
  }

  characteristicChanged(characteristic: Characteristic, value: any) {
    if (characteristic.type === 'DECIMAL') value = Math.round(value * 100) / 100

    for (const pair of this.outProduct.attributes) {
      if (pair.attributeName === characteristic.name) pair.attributeValue = value
    }
  }
}
