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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.keycloak.isLoggedIn()) {
        if (this.isAccessAllowed(route)) {
          return resolve(true);
        } else {
          console.log('User does not have required permissions.');
          this.router.navigate(['/']);
          return resolve(false);
        }
      } else {
        // Try to log in
        this.keycloak
          .login({
            redirectUri: location.origin + state.url
          }) // FIXME infinite loop
          .then(_ => {
            return resolve(true);
          })
          .catch(err => {
            console.log(err);
            this.router.navigate(['/']);
            return reject(err);
          });
      }
    });
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
