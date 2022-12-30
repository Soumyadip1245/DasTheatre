import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { DirectorComponent } from './component/director/director.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { UserComponent } from './component/user/user.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {path: '', redirectTo:'welcome',pathMatch:'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'authentication', component: AuthenticationComponent},
  {path: 'user', component: UserComponent},
  {path: 'admin', component: AdminComponent, canActivate: [LoginGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate: [LoginGuard]},
  {path: 'director', component: DirectorComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
