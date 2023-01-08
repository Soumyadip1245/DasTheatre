import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { DirectorComponent } from './component/director/director.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { ErrorpageComponent } from './component/errorpage/errorpage.component';
import { UserComponent } from './component/user/user.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { DirectorGuard } from './guard/director.guard';
import { EmployeeGuard } from './guard/employee.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'error', component: ErrorpageComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard, EmployeeGuard] },
  { path: 'director', component: DirectorComponent, canActivate: [AuthGuard, DirectorGuard] },
  { path: '**', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
