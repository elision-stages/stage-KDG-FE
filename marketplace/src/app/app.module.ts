import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent} from './app.footer.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent} from './app.menuitem.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {InputTextModule} from "primeng/inputtext";
import {MegaMenuModule} from "primeng/megamenu";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {MenuModule} from "primeng/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './components/login/login.component';
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import {DividerModule} from "primeng/divider";

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
    RegisterComponent
  ],
  imports: [
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
    DividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
