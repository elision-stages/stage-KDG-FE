import {Injectable} from '@angular/core';
import {Product} from "../model/Product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Response} from "../model/Response";

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
}
