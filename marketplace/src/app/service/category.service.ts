import {Injectable} from '@angular/core';
import {TreeNode} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../model/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(environment.api + 'getCategories')
  }

  formatCategories(cats: any, parent: number = null): TreeNode[] {
    let result: TreeNode[] = []
    cats.filter(cat => cat.parentId == parent).forEach((cat) => {
      result.push({
        "label": cat.name,
        "data": cat.id,
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "children": this.formatCategories(cats, cat.id)
      })
    })
    return result
  }

  add(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.api + 'createCategory', category)
  }
}
