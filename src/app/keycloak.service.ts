import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
// import { SubscriptionService } from './subscription.service';
import * as keycloack_js from 'keycloak-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  keycloakAuth: keycloack_js.KeycloakInstance;

  authToken: string;
  parsedAuthToken: any;
  isLogged = false;

  constructor(private router: Router, private platformLocation: PlatformLocation) {
    this.keycloakAuth = keycloack_js(environment.keycloak.config);

    this.init();
  }

  init() {
    this.keycloakAuth.init(environment.keycloak.init).success(authenticated => {
      if (authenticated) {
        this.isLogged = true;
        this.authToken = this.keycloakAuth.idToken;
        this.parsedAuthToken = this.keycloakAuth.idTokenParsed;

        setTimeout(_ => {
          this.refreshToken();
        }, 4 * 60 * 1000);

        // this.subscriptionService.init(
        //   this.getMemberOrganization(),
        //   this.getAuthToken()
        // );
        // if (this.router) {
        //   //self.router.navigate([this.router.url]);
        //   self.router.navigate(
        //     ['dataSharing', { outlets: { 'data-outlet': 'data' } }],
        //     { skipLocationChange: true }
        //   );
        // }
        // // only grant access to members
        // if (
        //   this.keycloakAuth.hasRealmRole(roleMember) ||
        //   this.keycloakAuth.hasRealmRole(roleAdmin) ||
        //   this.keycloakAuth.hasRealmRole(roleUser)
        // ) {

        // } else {
        //   self.router.navigate(['notAllowed'], { skipLocationChange: true });
        // }
      } else {
        this.isLogged = false;
        // this.router.navigate(['registerMember'], { skipLocationChange: true });
      }
    });
    // .error( _ => {
    //   this.toastr.toast('Error', 'Failed to initialize keycloak', 'error'
    //   );
    // })
  }

  isLoggedIn() {
    return this.isLogged;
  }

  isLoggable(): boolean {
    return !this.isLogged && !this.keycloakAuth.authenticated;
  }

  login(): void {
    this.keycloakAuth.login();
  }

  logout(): void {
    this.keycloakAuth.logout({
      redirectUri: (this.platformLocation as any).location.origin
    });
  }

  getAuthToken(): string {
    return this.keycloakAuth.token;
  }

  getMemberOrganization(): string {
    return this.parsedAuthToken.organizationID;
  }

  getMemberId(): string {
    return this.parsedAuthToken.sub;
  }

  hasRole(role: string): boolean {
    return this.keycloakAuth.hasRealmRole(role);
  }

  refreshToken(): void {
    this.keycloakAuth
      .updateToken(90)
      .success(refreshed => {
        if (refreshed) {
          // console.log("token updated");
        } else {
          // console.log("token still valid");
        }
      })
      .error(err => {
        console.error(err);
      });

    setTimeout(_ => {
      this.refreshToken();
    }, 4 * 60 * 1000);
  }
}
