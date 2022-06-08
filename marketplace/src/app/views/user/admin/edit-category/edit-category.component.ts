import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../../service/product/category.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationHelper} from "../../../../helpers/ValidationHelper";
import {MessageService, TreeNode} from "primeng/api";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  providers: [MessageService]
})
export class EditCategoryComponent implements OnInit {
  editForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    parentId: new FormControl('0', [Validators.required]),
    characteristics: new FormArray([])
  });
  readableErrors = ValidationHelper.readableErrors;
  isLoading: boolean = false

  attributeDialog: boolean = false
  characteristic: FormGroup
  attributeTypes = [{label: 'Whole number', value: 'INTEGER'}, {label: 'Decimal number', value: 'DECIMAL'}, {label: 'Yes / No', value: 'BOOL'}, {label: 'Text', value: 'STRING'}]
  requiredTypes = [{label: 'Not required', value: false}, {label: 'Required', value: true}]

  categoryList: TreeNode[] = [];
  parentCategory = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.route.params.subscribe( params => this.loadCategory(params['id']) );
  }

  ngOnInit(): void {
    this.characteristic = EditCategoryComponent.createCharacteristic()
    this.categoryService.getCategories().subscribe(cats => {
      this.categoryList = [{
        "label": "Root map",
        "data": 0,
        "expandedIcon": "pi pi-folder-open",
        "collapsedIcon": "pi pi-folder",
        "children": this.categoryService.formatCategories(cats, null, parseInt(this.route.snapshot.paramMap.get('id')))
      }]
    });
  }

  loadCategory(id: number) {
    this.categoryService.getCategoryById(id).subscribe({
      next: category => {
        this.editForm.get('id').setValue(category.id)
        this.editForm.get('parentId').setValue(category.parentId)
        //this.parentCategory = category.parentId
        this.editForm.get('name').setValue(category.name)
        for(let c of category.characteristics) {
          this.characteristics.push(EditCategoryComponent.createCharacteristic(c.name, c.type, c.required));
        }

      },
      error: _error => {
        this.router.navigate([`pages/notfound`], { replaceUrl: true });
      }
    })
  }

  get characteristics(): FormArray {
    return this.editForm.get('characteristics') as FormArray
  }

  onEdit(): void {
    this.editForm.disable()
    this.isLoading = true
    this.categoryService.update(this.editForm.value).subscribe({
      next: (_result) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Category updated succesfully'});
        this.router.navigate(['categories'])
      },
      error: (result) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: Object.values(result.error)[0].toString()});
      }
    }).add(() => {
      this.editForm.enable()
      this.isLoading = false
    })
  }

  deleteCharacteristic(i: number) {
    this.characteristics.removeAt(i)
  }

  setParentId(parent: any) {
    this.editForm.get('parentId').setValue(parent.node.data)
  }

  openNewAttribute() {
    this.attributeDialog = true
  }

  hideNewAttribute() {
    this.attributeDialog = false
  }

  addAttribute() {
    if(this.characteristic.controls['name'].invalid) return
    this.characteristics.push(this.characteristic);
    this.characteristic = EditCategoryComponent.createCharacteristic();
    this.attributeDialog = false
  }

  private static createCharacteristic(name = '', type = 'INTEGER', required = false) {
    return new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
      type: new FormControl(type, [Validators.required]),
      required: new FormControl(required, [Validators.required])
    })
  }
}
