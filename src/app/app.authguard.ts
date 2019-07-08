import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private router: Router, private keycloak: KeycloakService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.keycloak.isLoggedIn()) {
      if (this.isAccessAllowed(route)) {
        return true;
      } else {
        this.router.navigate(['/']);
        // Warn about permissions?
        console.log('User does not have required permissions.');
        return false;
      }
    } else {
      this.router.navigate(['/']);
      // TODO: not logged in so redirect to login page with the return url
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  isAccessAllowed(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles: string[] = route.data.roles;
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    } else {
      return requiredRoles.every(role => this.keycloak.hasRole(role));
    }
  }
}
