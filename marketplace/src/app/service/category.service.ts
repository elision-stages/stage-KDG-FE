import { Injectable } from '@angular/core';
import {TreeNode} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Promise<TreeNode[]> {
    return new Promise<TreeNode[]>((resolve) => {
      resolve([
        {
          "label": "Computergebeuren",
          "expandedIcon": "pi pi-folder-open",
          "collapsedIcon": "pi pi-folder",
          "children": [
            {
              "label": "Opslag",
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": [
                {"label": "HDD", "icon": "pi pi-file"},
                {"label": "SSD", "icon": "pi pi-file"},
                {"label": "NAS", "icon": "pi pi-file"}
              ]
            },
            {
              "label": "Extra",
              "expandedIcon": "pi pi-folder-open",
              "collapsedIcon": "pi pi-folder",
              "children": [
                {"label": "Toetsenborden", "icon": "pi pi-file"},
                {"label": "Muizen", "icon": "pi pi-file"},
                {"label": "Xyz", "icon": "pi pi-file"}
              ]
            }]
        },
        {
          "label": "Kleding",
          "expandedIcon": "pi pi-folder-open",
          "collapsedIcon": "pi pi-folder",
          "children": [
            {"label": "Broeken", "icon": "pi pi-image"},
            {"label": "Shirts", "icon": "pi pi-image"},
            {"label": "Hoodies", "icon": "pi pi-image"},
            {"label": "Petten", "icon": "pi pi-image"}]
        }
      ])
    })
  }
}
