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
  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    parentId: new FormControl('0', [Validators.required]),
    characteristics: new FormArray([])
  });
  readableErrors = ValidationHelper.readableErrors;
  isLoading: boolean = false

  categoryView: TreeNode[] = [];
  categoryList: TreeNode[] = [];

  constructor(private categoryService: CategoryService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh(): void {
    this.categoryService.getCategories().subscribe(cats => {
      this.categoryView = this.categoryService.formatCategories(cats)
      this.categoryList = [{
        "label": "Root map",
        "data": 0,
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "children": this.categoryService.formatCategories(cats)
      }]
    });
  }

  onAdd(): void {
    this.addForm.disable()
    this.isLoading = true
    this.categoryService.add(this.addForm.value).subscribe({
      next: (_result) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Category added'});
        this.addForm.reset()
        this.refresh()
      },
      error: (_error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Unknown error'});
      }
    }).add(() => {
      this.addForm.enable()
      this.isLoading = false
    })
  }

  setParentId(parent: any) {
    this.addForm.get('parentId').setValue(parent.node.data)
  }
}
