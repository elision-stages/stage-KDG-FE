import {Injectable} from '@angular/core';
import {Product} from "../model/Product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Response} from "../model/Response";
import {ProductId} from "../model/ProductId";
import {preserveWhitespacesDefault} from "@angular/compiler";

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
  editProduct(product: Product): Observable<Response>{
    return this.http.post<Response>(environment.api + 'editProduct', product)
  }

  getProductsByVendor(vendorId: number): Observable<Array<ProductId>> {
    return this.http.get<Array<ProductId>>(environment.api + 'getProductsByVendor/' + vendorId)
  }
}
