import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppMainComponent} from "./components/main/app.main.component";
import {NotfoundComponent} from "./views/public/notfound/notfound.component";
import {AccessComponent} from "./views/public/access/access.component";
import {DashboardComponent} from "./views/public/dashboard/dashboard.component";
import {LoginComponent} from "./views/public/login/login.component";
import {RegisterComponent} from "./views/public/register/register.component";
import {VendorComponent} from "./views/public/vendor/vendor.component";
import {CategoriesComponent} from "./views/user/admin/categories/categories.component";
import {RouteGuardService} from "./service/route-guard.service";
import {AddProductComponent} from "./views/user/vendor/add-product/add-product.component";
import {ProductsComponent} from "./views/user/vendor/products/products.component";
import {EditProductComponent} from "./views/user/vendor/edit-product/edit-product.component";
import {ProductComponent} from "./views/public/product/product.component";
import {CartComponent} from "./views/user/customer/cart/cart.component";
import {OrderOverviewComponent} from "./views/user/shared/order-overview/order-overview.component";
import {OrderComponent} from "./views/user/shared/order/order.component";
import {CreateCategoryComponent} from "./views/user/admin/create-category/create-category.component";
import { EditCategoryComponent } from './views/user/admin/edit-category/edit-category.component';

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
          {path: 'category/:id', component: EditCategoryComponent},
          {path: 'categories/add', component: CreateCategoryComponent, canActivate: [ RouteGuardService ]},
          {path: 'categories', component: CategoriesComponent, canActivate: [ RouteGuardService ]},
          {path: 'product/:productId/edit', component: EditProductComponent},
          {path: 'addProduct', component: AddProductComponent},
          {path: 'products', component: ProductsComponent, canActivate: [ RouteGuardService ]},
          {path: 'product/:id', component: ProductComponent},
          {path: 'cart', component: CartComponent, canActivate: [ RouteGuardService ]},
          {path: 'orders', component: OrderOverviewComponent, canActivate: [ RouteGuardService ]},
          {path: 'order/:id', component: OrderComponent}
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
