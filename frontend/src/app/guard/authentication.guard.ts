import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, TitleStrategy, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate() {
    var type = this.auth.getTypeTokenGet()
    if (type == 'Admin' || type == 'Director' || type == 'Employee') {
      return true
    }
    this.router.navigate(['/authentication'])
    return false;
  }

}
