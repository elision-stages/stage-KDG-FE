import { Component, OnInit } from '@angular/core';
import {TreeNode} from "primeng/api";
import {CategoryService} from "../../../service/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationHelper} from "../../../helpers/ValidationHelper";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    parent: new FormControl('', [Validators.required])
  });
  readableErrors = ValidationHelper.readableErrors;
  isLoading: boolean = false

  categoryView: TreeNode[];
  categoryList: TreeNode[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().then(cats => {
      this.categoryView = [...cats]
      this.categoryList = [
        {
          "label": "Root map",
          "data": 0,
          "expandedIcon": "pi pi-folder-open",
          "collapsedIcon": "pi pi-folder",
          "children": [...cats]
        }]
    });
  }

}
