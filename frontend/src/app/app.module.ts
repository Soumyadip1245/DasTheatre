import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Router} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { AdminComponent } from './component/admin/admin.component';
import { UserComponent } from './component/user/user.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DirectorComponent } from './component/director/director.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    AuthenticationComponent,
    AdminComponent,
    UserComponent,
    EmployeeComponent,
    DirectorComponent
  ],
  imports: [BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
