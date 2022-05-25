import { Component, OnInit } from '@angular/core';
import {MessageService, TreeNode} from "primeng/api";
import {CategoryService} from "../../../../service/product/category.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationHelper} from "../../../../helpers/ValidationHelper";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit {
  categoryView: TreeNode[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh(): void {
    this.categoryService.getCategories().subscribe(cats => {
      this.categoryView = this.categoryService.formatCategories(cats)
    });
  }
}
