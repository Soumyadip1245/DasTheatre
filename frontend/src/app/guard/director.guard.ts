import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DirectorGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate() {
    var type = this.auth.getTypeTokenGet()
    if (type == 'Director') {
      return true
    }
    this.router.navigate(['/error'])
    return false;
  }

}
