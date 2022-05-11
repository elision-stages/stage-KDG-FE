import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent} from './app.footer.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent} from './app.menuitem.component';
import { NotfoundComponent } from './components/open/notfound/notfound.component';
import { AccessComponent } from './components/open/access/access.component';
import { DashboardComponent } from './components/open/dashboard/dashboard.component';
import {InputTextModule} from "primeng/inputtext";
import {MegaMenuModule} from "primeng/megamenu";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {MenuModule} from "primeng/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './components/open/login/login.component';
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/open/register/register.component';
import {DividerModule} from "primeng/divider";
import {HttpClientModule} from "@angular/common/http";
import {MessageModule} from "primeng/message";
import {DialogModule} from "primeng/dialog";
import { ToastModule } from 'primeng/toast';
import { VendorComponent } from './components/open/vendor/vendor.component';
import {ColorPickerModule} from "primeng/colorpicker";
import {EditorModule} from "primeng/editor";
import {CategoriesComponent} from "./components/vendor/categories/categories.component";
import {TreeSelectModule} from "primeng/treeselect";
import { CustomPasswordInputComponent } from './components/custom-password-input/custom-password-input.component';
import { NgAisModule } from 'angular-instantsearch';
import {CardModule} from "primeng/card";
import { ChunkPipe } from './helpers/chunk.pipe';
import { StoreModule } from '@ngrx/store';
import {MessagesModule} from "primeng/messages";
import {ProductComponent} from './components/product/product.component';
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {KnobModule} from "primeng/knob";
import {SelectButtonModule} from "primeng/selectbutton";
import {SliderModule} from "primeng/slider";
import {InputNumberModule} from "primeng/inputnumber";
import { ProductsComponent } from './components/vendor/products/products.component';
import {TableModule} from "primeng/table";
import {ConfirmPopupModule} from "primeng/confirmpopup";

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
    ProductComponent,
    CustomPasswordInputComponent,
    ChunkPipe,
    ProductsComponent
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
    TableModule,
    ConfirmPopupModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
