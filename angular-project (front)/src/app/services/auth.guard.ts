import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  objSession: any;

  constructor(
    public router: Router,
    private cookieService: CookieService
  ) { }

  checkSession() {
    if (this.cookieService.check('_session_user')) {
      this.objSession = this.cookieService.get('_session_user');
      this.objSession = JSON.parse(atob(this.objSession));
    } else {
      this.objSession = null;
      this.router.navigate(['/login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    this.checkSession();
    // return true;

    try {
      if ( route.data.type.includes(this.objSession.tipo) ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }

  }

}
