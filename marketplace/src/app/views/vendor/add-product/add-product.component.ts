import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/Product";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/Category";
import {Component} from "@angular/core";
import {MessageService} from "primeng/api";
import {Characteristic} from "../../../model/Characteristic";
import {AttributeValue} from "../../../model/AttributeValue";
import {ValidationHelper} from "../../../helpers/ValidationHelper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  providers: [MessageService]
})
export class AddProductComponent {
  readableErrors = ValidationHelper.readableErrors
  addProduct = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0.01, [Validators.required, Validators.min(0.01)])
  })
  outProduct: Product
  categories: Category[]
  selectedCategory: Category
  isLoading: boolean = false

  constructor(private productService: ProductService, private categoryService: CategoryService, private messageService: MessageService, private router: Router) {
    this.getAllCategories();
    this.categories = [];
    this.outProduct = new Product();
  }

  onAdd(): void {
    this.addProduct.disable()
    this.isLoading = true
    this.outProduct.price = this.addProduct.value.price;
    this.outProduct.title = this.addProduct.value.title;
    this.outProduct.description = this.addProduct.value.description;
    this.outProduct.categoryId = this.selectedCategory.id;
    this.outProduct.category = this.selectedCategory;

    this.productService.addProduct(this.outProduct).subscribe({
      next: () => {
        this.router.navigate(['/products'])
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({severity: error, summary: 'Error', detail: 'Problem adding product'})
      }
    }).add(() => {
      this.addProduct.enable()
      this.isLoading = false
    })
  }

  getAllCategories(): any {
    this.categoryService.getCategories().subscribe({
      next: (_result) => {
        this.categories = _result;
        return _result;
      },
      error: (error) => {
        this.messageService.add({severity: error, summary: 'Error', detail: 'Problem getting categories from server'})
      }
    })
  }

  selectCategory() {
    this.outProduct.attributes.splice(0, this.outProduct.attributes.length)

    for (let attribute of this.selectedCategory.characteristics) {
      let pair = new AttributeValue();
      pair.attributeName = attribute.name;
      pair.value = ''
      this.outProduct.attributes.push(pair)
    }
  }

  characteristicChanged(characteristic: Characteristic, value: any) {
    if (characteristic.type === 'DECIMAL') value = Math.round(value * 100) / 100

    for (const pair of this.outProduct.attributes) {
      if (pair.attributeName === characteristic.name) pair.value = value
    }
  }

  setDescription(event: any) {
    this.addProduct.get('description').setValue(event.htmlValue)
  }
}
