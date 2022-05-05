import {Injectable} from '@angular/core';
import {Product} from "../model/Product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  addProduct(product: Product): Observable<Product> {
    let url = environment.api + 'addProduct';
    console.log(url.toString());
    console.log(product);
    return this.http.post<Product>(url, product);
  }
}
