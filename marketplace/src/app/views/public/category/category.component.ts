import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import staticRandomInt from "../../../helpers/staticRandomInt";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../service/product/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  loading: boolean = true;

  breadcrumb: MenuItem[]
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'}
  children: any[] = []

  category: any = null
  id: number

  random: Function = staticRandomInt();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService)
  {
    this.route.params.subscribe( params => this.loadCategory(params['id']) );
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
  }

  loadCategory(id: number) {
    this.id = id
    this.categoryService.getCategories().subscribe({
      next: categories => {
        this.loading = false
        this.category = categories.find(cat => cat.id == id)
        if(!this.category) throw this.router.navigate([`pages/notfound`], { replaceUrl: true })
        this.children = categories.filter(cat => cat.parentId === this.category.id)
        this.generateBreadcrumb(categories)
      },
      error: _error => {
        this.router.navigate([`pages/notfound`], { replaceUrl: true })
      }
    })
  }

  private generateBreadcrumb(categories) {
    this.breadcrumb = []
    let category = this.category
    while(category) {
      this.breadcrumb.unshift({
        routerLink: '/category/' + category.id,
        label: category.name
      })
      category = categories.find(cat => cat.id === category.parentId)
    }
  }
}
