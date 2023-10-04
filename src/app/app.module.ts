import { NgModule, Component, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInterceptionInterceptor } from './custom-interception.interceptor';
import { MainComponent } from './main/main.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { authGuard } from './auth.guard';
import { allGouardGuard } from './all-guard.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AccountantCreationComponent } from './accountant-creation/accountant-creation.component';
import { AccountantsComponent } from './accountants/accountants.component';
import { AccountMainComponent } from './account-main/account-main.component';

const appRout:Routes = [
  {path:'', component: LoginComponent},
  {path:'accountant-main/:id', component: AccountMainComponent, canActivate:[allGouardGuard]},
  {path:'login', component: LoginComponent},
  {path:'accountant-creation', component: AccountantCreationComponent, canActivate:[authGuard]},
  {path:'accountants', component: AccountantsComponent, canActivate:[allGouardGuard]},
  {path:'admin', component: AdminComponent, canActivate:[authGuard],data:{'roles':'admin'}},
  {path:'register', component: RegisterComponent},
  {path:'main', component: MainComponent, canActivate:[allGouardGuard]},
  {path:'**', component: ErrorComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    MainComponent,
    NavbarComponent,
    AdminComponent,
    AccountantCreationComponent,
    AccountantsComponent,
    AccountMainComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    NgxCaptchaModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRout),
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: CustomInterceptionInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
