import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppMainComponent} from "./app.main.component";
import {NotfoundComponent} from "./components/open/notfound/notfound.component";
import {AccessComponent} from "./components/open/access/access.component";
import {DashboardComponent} from "./components/open/dashboard/dashboard.component";
import {LoginComponent} from "./components/open/login/login.component";
import {RegisterComponent} from "./components/open/register/register.component";
import {VendorComponent} from "./components/open/vendor/vendor.component";
import {CategoriesComponent} from "./components/vendor/categories/categories.component";
import {ProductComponent} from "./components/product/product.component";

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
          {path: 'categories', component: CategoriesComponent},
          {path: 'addProduct', component: ProductComponent},
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
