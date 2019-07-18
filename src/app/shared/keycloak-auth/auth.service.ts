import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { KeycloakEvent, KeycloakEventType } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends KeycloakService {
  signedIn = false;

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
        console.log('logged in: OnAuthRefreshSuccess');
        break;
      case KeycloakEventType.OnAuthSuccess:
        this.signedIn = true;
        console.log('logged in: OnAuthSuccess');
        break;
      case KeycloakEventType.OnReady:
        console.log('OnReady');
        break;
      case KeycloakEventType.OnTokenExpired:
        this.signedIn = false;
        console.log('logged in: OnAuthSuccess');
        break;
      default:
        break;
    }
  }
}
