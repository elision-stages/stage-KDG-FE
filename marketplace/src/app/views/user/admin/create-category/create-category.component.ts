import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationHelper} from "../../../../helpers/ValidationHelper";
import {MessageService, TreeNode} from "primeng/api";
import {CategoryService} from "../../../../service/product/category.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  providers: [MessageService]
})
export class CreateCategoryComponent implements OnInit {
  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    parentId: new FormControl('0', [Validators.required]),
    characteristics: new FormArray([])
  });
  readableErrors = ValidationHelper.readableErrors;
  isLoading: boolean = false

  attributeTypes = [{label: 'Whole number', value: 'INTEGER'}, {label: 'Decimal number', value: 'DECIMAL'}, {label: 'Yes / No', value: 'BOOL'}, {label: 'Text', value: 'STRING'}]
  requiredTypes = [{label: 'Not required', value: false}, {label: 'Required', value: true}]

  categoryList: TreeNode[] = [];

  characteristicSubject: Subject<void> = new Subject<void>();

  constructor(private categoryService: CategoryService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(cats => {
      this.categoryList = [{
        "label": "Root map",
        "data": 0,
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "children": this.categoryService.formatCategories(cats)
      }]
    });
  }

  get characteristics(): FormArray {
    return this.addForm.get('characteristics') as FormArray
  }

  onAdd(): void {
    this.addForm.disable()
    this.isLoading = true
    this.categoryService.add(this.addForm.value).subscribe({
      next: (_result) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Category added succesfully'});
        this.addForm.reset()
        this.characteristics.controls = []
      },
      error: (result) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: Object.values(result.error)[0].toString()});
      }
    }).add(() => {
      this.addForm.enable()
      this.isLoading = false
    })
  }

  deleteCharacteristic(i: number) {
    this.characteristics.removeAt(i)
  }

  setParentId(parent: any) {
    this.addForm.get('parentId').setValue(parent.node.data)
  }

  openNewAttribute() {
    this.characteristicSubject.next()
  }

  addAttribute(characteristic: FormGroup) {
    this.characteristics.push(characteristic)
  }
}
