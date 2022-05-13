import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './components/main/app.main.component';
import { AppTopBarComponent } from './components/topbar/app.topbar.component';
import { AppFooterComponent} from './components/footer/app.footer.component';
import { AppMenuComponent } from './components/menu/app.menu.component';
import { AppMenuitemComponent} from './components/menu/menuitem/app.menuitem.component';
import { NotfoundComponent } from './views/public/notfound/notfound.component';
import { AccessComponent } from './views/public/access/access.component';
import { DashboardComponent } from './views/public/dashboard/dashboard.component';
import {InputTextModule} from "primeng/inputtext";
import {MegaMenuModule} from "primeng/megamenu";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {MenuModule} from "primeng/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './views/public/login/login.component';
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './views/public/register/register.component';
import {DividerModule} from "primeng/divider";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MessageModule} from "primeng/message";
import {DialogModule} from "primeng/dialog";
import { ToastModule } from 'primeng/toast';
import { VendorComponent } from './views/public/vendor/vendor.component';
import {ColorPickerModule} from "primeng/colorpicker";
import {EditorModule} from "primeng/editor";
import {CategoriesComponent} from "./views/admin/categories/categories.component";
import {TreeSelectModule} from "primeng/treeselect";
import { CustomPasswordInputComponent } from './components/custom-password-input/custom-password-input.component';
import { NgAisModule } from 'angular-instantsearch';
import {CardModule} from "primeng/card";
import { ChunkPipe } from './helpers/chunk.pipe';
import { StoreModule } from '@ngrx/store';
import {MessagesModule} from "primeng/messages";
import {AddProductComponent} from './views/vendor/add-product/add-product.component';
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {KnobModule} from "primeng/knob";
import {SelectButtonModule} from "primeng/selectbutton";
import {SliderModule} from "primeng/slider";
import {InputNumberModule} from "primeng/inputnumber";
import { ProductsComponent } from './views/vendor/products/products.component';
import {TableModule} from "primeng/table";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ProductComponent} from "./views/public/product/product.component";
import {SkeletonModule} from "primeng/skeleton";
import {GalleriaModule} from "primeng/galleria";
import {TabViewModule} from "primeng/tabview";
import {BreadcrumbModule} from "primeng/breadcrumb";
import { CartComponent } from './views/user/cart/cart.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CustomInterceptorInterceptor} from "./service/custom-interceptor.interceptor";
import { EditProductComponent } from './components/vendor/edit-product/edit-product.component';
import {FileUploadModule} from "primeng/fileupload";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [
    AppComponent,
    AppTopBarComponent,
    AppMainComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    NotfoundComponent,
    AccessComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    VendorComponent,
    CategoriesComponent,
    CustomPasswordInputComponent,
    AddProductComponent,
    CustomPasswordInputComponent,
    ChunkPipe,
    EditProductComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    MegaMenuModule,
    ButtonModule,
    BadgeModule,
    MenuModule,
    BrowserAnimationsModule,
    RippleModule,
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    MessageModule,
    DialogModule,
    ToastModule,
    ColorPickerModule,
    EditorModule,
    TreeSelectModule,
    DropdownModule,
    MultiSelectModule,
    KnobModule,
    SelectButtonModule,
    SliderModule,
    InputNumberModule,
    TreeSelectModule,
    NgAisModule.forRoot(),
    CardModule,
    SelectButtonModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    MessagesModule,
    FileUploadModule,
    ProgressSpinnerModule,
    MessagesModule,
    TableModule,
    ConfirmPopupModule,
    SkeletonModule,
    GalleriaModule,
    TabViewModule,
    BreadcrumbModule,
    ConfirmDialogModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
