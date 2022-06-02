import {Component, OnInit} from '@angular/core';
import {ProductId} from "../../../../model/ProductId";
import {ProductService} from "../../../../service/product/product.service";
import {Product} from "../../../../model/Product";
import {AttributeValue} from "../../../../model/AttributeValue";
import {Category} from "../../../../model/Category";
import {Characteristic} from "../../../../model/Characteristic";
import {CategoryService} from "../../../../service/product/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UploadService} from "../../../../service/product/upload.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent implements OnInit {
  productNames: Array<ProductId>
  selectedProduct: Product
  categories: Array<Category>
  isBusy: boolean

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute,
              private uploadService: UploadService, private router: Router) {
    this.isBusy = true;
    this.fetchCategories()
    this.selectProduct(this.route.snapshot.paramMap.get('productId'));
    this.isBusy = false;

  }

  async ngOnInit(): Promise<void> {
  }

  selectProduct(productId: any) {
    this.productService.getProductById(productId).subscribe(value => {
      this.selectedProduct = value;
    })
  }

  attributeChanged(characteristic: Characteristic, value) {
    if (this.selectedProduct.attributes.find(attr => attr.attributeName == characteristic.name) === undefined) {
      const attributeValue = new AttributeValue();
      attributeValue.attributeName = characteristic.name
      this.selectedProduct.attributes.push(attributeValue)
    }

    if (characteristic.type === 'DECIMAL') value = Math.round(value * 100) / 100

    for (const pair of this.selectedProduct.attributes) {
      if (pair.attributeName === characteristic.name) pair.value = value
    }
  }

  getCharacteristicValue(characteristicName: string): any {
    const attribute = this.selectedProduct.attributes.find(value => value.attributeName == characteristicName);
    if (attribute === undefined) return 0
    return attribute.value.toString()
  }

  private fetchCategories() {
    this.categoryService.getCategories().subscribe(value => {
      return this.categories = value;
    });
  }

  editProduct() {
    this.productService.editProduct(this.selectedProduct).subscribe(() => this.router.navigate(['/products']))
  }

  selectCategory($event) {
    this.selectedProduct.category = this.categories.find(value => value.id === $event.value)
  }

  addImage($event: any) {
    if ($event.target.value) {
      $event.preventDefault()
      this.selectedProduct.images.push($event.target.value);
      $event.target.value = ''
    }
    return false
  }

  deleteImage(select: String) {
    this.selectedProduct.images = this.selectedProduct.images.filter(img => img != select)
  }
}
