import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { KeycloakEvent, KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends KeycloakService {
  signedIn = false;
  token: string;
  userName: string;
  profile;

  constructor() {
    // initialize KeycloakSerive
    super();
    this.init(environment.keycloak);

    // bind keycloak events to be processed
    this.keycloakEvents$.subscribe(event => this.keycloakEventTriggered(event));

    // init authorized value
    this.isLoggedIn().then(logged => (this.signedIn = logged));
  }

  private keycloakEventTriggered(event: KeycloakEvent): void {
    switch (event.type) {
      case KeycloakEventType.OnAuthError:
        this.signedIn = false;
        console.log('logged out: OnAuthError');
        break;
      case KeycloakEventType.OnAuthLogout:
        this.signedIn = false;
        console.log('logged out: OnAuthLogout');
        break;
      case KeycloakEventType.OnAuthRefreshError:
        this.signedIn = false;
        console.log('logged out: OnAuthRefreshError');
        break;
      case KeycloakEventType.OnAuthRefreshSuccess:
        this.signedIn = true;
        this.token = this.getKeycloakInstance().token;
        this.userName = this.getKeycloakInstance().loadUserProfile.name;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', this.userName);
        console.log('logged in: OnAuthRefreshSuccess');
        break;
      case KeycloakEventType.OnAuthSuccess:
        this.signedIn = true;
        console.log('logged in: OnAuthSuccess');
        this.getKeycloakInstance().loadUserProfile().success(profile => {
          this.profile = profile;
          console.log(profile.firstName);
          console.log(profile.lastName);
          console.log(profile.username);
          console.log(profile.email);
          localStorage.setItem('firstName', profile.firstName);
          localStorage.setItem('lastName', profile.lastName);
          localStorage.setItem('username', profile.username);
          localStorage.setItem('email', profile.email);
        });
        break;
      case KeycloakEventType.OnReady:
        console.log('OnReady');
        this.getToken().then(t => {
          console.log('Token obtained!');
          this.token = t;
          localStorage.setItem('token', t);
        });
        break;
      case KeycloakEventType.OnTokenExpired:
        console.log('logged in: OnTokenExpired');
        this.updateToken(3600);
        break;
      default:
        break;
    }
  }

  getProfile() {
    return this.profile;
  }
}
