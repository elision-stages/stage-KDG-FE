import {Injectable} from '@angular/core';
import {TreeNode} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../../model/Category";
import {Product} from "../../model/Product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(environment.api + 'category/')
  }

  formatCategories(cats: any, parent: number = null, ignoreCat: number = null): TreeNode[] {
    let result: TreeNode[] = []
    cats.filter(cat => cat.parentId == parent).forEach((cat) => {
      result.push({
        "label": cat.name,
        "data": cat.id,
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "selectable": cat.id != ignoreCat,
        "children": this.formatCategories(cats, cat.id, ignoreCat)
      })
    })
    return result
  }

  add(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.api + 'category/create', category)
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(environment.api + 'category/' + id);
  }

  update(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.api + 'category/edit', category)
  }
}
