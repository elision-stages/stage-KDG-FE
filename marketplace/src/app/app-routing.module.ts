import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppMainComponent} from "./components/main/app.main.component";
import {NotfoundComponent} from "./views/public/notfound/notfound.component";
import {AccessComponent} from "./views/public/access/access.component";
import {DashboardComponent} from "./views/public/dashboard/dashboard.component";
import {LoginComponent} from "./views/public/login/login.component";
import {RegisterComponent} from "./views/public/register/register.component";
import {VendorComponent} from "./views/public/vendor/vendor.component";
import {CategoriesComponent} from "./views/admin/categories/categories.component";
import {RouteGuardService} from "./service/route-guard.service";
import {AddProductComponent} from "./views/vendor/add-product/add-product.component";
import {ProductsComponent} from "./views/vendor/products/products.component";
import {EditProductComponent} from "./components/vendor/edit-product/edit-product.component";
import {ProductComponent} from "./views/public/product/product.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppMainComponent,
        children: [
          {path: '', component: DashboardComponent},
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
          {path: 'vendor', component: VendorComponent},
          {path: 'categories', component: CategoriesComponent, canActivate: [ RouteGuardService ]},
          {path: 'editProduct/:productId', component: EditProductComponent},
          {path: 'addProduct', component: AddProductComponent},
          {path: 'products', component: ProductsComponent, canActivate: [ RouteGuardService ]},
          {path: 'product/:id', component: ProductComponent},
        ]
      },
      {path:'pages/notfound', component: NotfoundComponent},
      {path:'pages/access', component: AccessComponent},
      {path: '**', redirectTo: 'pages/notfound'},
    ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
