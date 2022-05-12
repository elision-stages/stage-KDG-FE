import {Injectable} from '@angular/core';
import {Product} from "../model/Product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Response} from "../model/Response";
import {ProductId} from "../model/ProductId";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  addProduct(product: Product): Observable<Response> {
    let url = environment.api + 'addProduct';
    return this.http.post<Response>(url, product);
  }

  editProduct(product: Product): Observable<string> {
    const url = environment.api + 'editProduct';
    return this.http.post<string>(url, product)
  }

  getProductsByVendor(vendorId: number): Observable<Array<ProductId>> {
    return this.http.get<Array<ProductId>>(environment.api + 'getProductsByVendor/' + vendorId)
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(environment.api + 'product/' + productId);
  }
}
