import {Component, OnInit} from '@angular/core';
import {ProductId} from "../../../model/ProductId";
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/Product";
import {AttributeValue} from "../../../model/AttributeValue";
import {Category} from "../../../model/Category";
import {Characteristic} from "../../../model/Characteristic";
import {CategoryService} from "../../../service/category.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productNames: Array<ProductId>
  selectedProduct: Product
  categories: Array<Category>

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.fetchCategories()

    //todo: replace when calls are ready
    this.productNames = new Array<ProductId>()
    this.productNames.push(new ProductId("test1", 1), new ProductId("test2", 2))
    this.selectProduct(3)
  }

  ngOnInit(): void {
    //todo: uncomment when call is ready
    //this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getProductsByVendor(10).subscribe(value => this.productNames = value)
  }

  selectProduct(productId: number) {
    //todo: uncomment when call is ready
    //this.selectedProduct = productService.getProductById(productId)
    this.selectedProduct = new Product();
    this.selectedProduct.title = "test product"
    this.selectedProduct.price = 2.4
    this.selectedProduct.description = "test description"

    let attributeValue = new AttributeValue();
    attributeValue.attributeValue = "first"
    attributeValue.attributeName = "enum value"
    this.selectedProduct.attributes.push(attributeValue)

    attributeValue = new AttributeValue();
    attributeValue.attributeValue = "3"
    attributeValue.attributeName = "int characteristic"
    this.selectedProduct.attributes.push(attributeValue)

    attributeValue = new AttributeValue();
    attributeValue.attributeValue = "3.5"
    attributeValue.attributeName = "double characteristic"
    this.selectedProduct.attributes.push(attributeValue)

    const category = new Category()
    category.name = "test category"
    category.characteristics = new Array<Characteristic>()

    let characteristic = new Characteristic();
    characteristic.type = "ENUMERATION"
    characteristic.name = "enum value"
    characteristic.enumValues = new Array<string>("first", "second", "third")
    category.characteristics.push(characteristic)

    characteristic = new Characteristic();
    characteristic.type = "INTEGER"
    characteristic.name = "int characteristic"
    category.characteristics.push(characteristic)

    characteristic = new Characteristic();
    characteristic.type = "DECIMAL"
    characteristic.name = "double characteristic"
    category.characteristics.push(characteristic)

    characteristic = new Characteristic();
    characteristic.type = "BOOL"
    characteristic.name = "boolean characteristic"
    category.characteristics.push(characteristic)

    this.selectedProduct.category = category;
  }

  attributeChanged(characteristic: Characteristic, value) {
    if (this.selectedProduct.attributes.find(attr => attr.attributeName == characteristic.name) === undefined) {
      const attributeValue = new AttributeValue();
      attributeValue.attributeName = characteristic.name
      this.selectedProduct.attributes.push(attributeValue)
    }

    if (characteristic.type === 'DECIMAL') value = Math.round(value * 100) / 100

    for (const pair of this.selectedProduct.attributes) {
      if (pair.attributeName === characteristic.name) pair.attributeValue = value
    }
    console.log(this.selectedProduct);
  }

  getCharacteristicValue(characteristicName: string): any {
    const attribute = this.selectedProduct.attributes.find(value => value.attributeName == characteristicName);
    if (attribute === undefined) return 0
    return attribute.attributeValue
  }

  private fetchCategories() {
    this.categoryService.getCategories().subscribe(value => this.categories = value);
  }

  saveProduct() {
    this.productService.editProduct(this.selectedProduct);
  }

  uploadImages(event: any) {
    console.log(event.files)
  }
}
