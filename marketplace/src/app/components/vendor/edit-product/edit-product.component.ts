import {Component, OnInit} from '@angular/core';
import {ProductId} from "../../../model/ProductId";
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/Product";
import {AttributeValue} from "../../../model/AttributeValue";
import {Category} from "../../../model/Category";
import {Characteristic} from "../../../model/Characteristic";
import {CategoryService} from "../../../service/category.service";
import {ActivatedRoute} from "@angular/router";
import {UploadService} from "../../../service/upload.service";

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
              private uploadService: UploadService) {
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
      console.log(this.selectedProduct);
      console.log(this.categories);
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
    return attribute.value
  }

  private fetchCategories() {
    this.categoryService.getCategories().subscribe(value => {
      console.log(value);
      return this.categories = value;
    });
  }

  editProduct() {
    console.log(this.selectedProduct);
    this.productService.editProduct(this.selectedProduct).subscribe(value => console.log(value))
  }

  uploadImages(event: any) {
    this.uploadService.fileUpload(event.files[0])
  }

  selectCategory(event) {
    this.selectedProduct.category = this.categories.find(value => value.id === event.value)
  }
}
