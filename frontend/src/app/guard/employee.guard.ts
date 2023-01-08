import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate() {
    var type = this.auth.getTypeTokenGet()
    if (type == 'Employee') {
      return true
    }
    this.router.navigate(['/error'])
    return false;
  }

}