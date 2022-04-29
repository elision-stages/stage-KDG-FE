import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppMainComponent} from "./app.main.component";
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {AccessComponent} from "./components/access/access.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: AppMainComponent,
        children: [
          {path: '', component: DashboardComponent},
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
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
