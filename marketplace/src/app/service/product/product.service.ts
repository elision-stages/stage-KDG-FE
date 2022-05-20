import {Injectable} from '@angular/core';
import {Product} from "../../model/Product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Response} from "../../model/Response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getMyProducts(): Observable<Product[]> {
    let url = environment.api + 'getMyProducts';
    return this.http.get<Product[]>(url, {
      withCredentials: true
    });
  }

  addProduct(product: Product): Observable<Response> {
    let url = environment.api + 'addProduct';
    return this.http.post<Response>(url, product);
  }

  editProduct(product: Product): Observable<string> {
    const url = environment.api + 'editProduct';
    return this.http.post<string>(url, product)
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(environment.api + 'product/' + productId);
  }

  deleteProduct(id: number) {
    let url = environment.api + 'product/' + id;
    return this.http.delete<Product[]>(url);
  }
}
