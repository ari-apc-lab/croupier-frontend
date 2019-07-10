import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
import { KeycloakEvent, KeycloakEventType } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends KeycloakService {
  private _logged$ = new Subject<boolean>();

  constructor() {
    // initialize KeycloakSerive
    super();
    this.init(environment.keycloak);

    // bind keycloak events to be processed
    this.keycloakEvents$.subscribe(event => this.keycloakEventTriggered(event));

    // init authorized value
    this.isLoggedIn().then(logged => this._logged$.next(logged));
  }

  get isLogged$(): Observable<boolean> {
    return this._logged$.asObservable();
  }

  private keycloakEventTriggered(event: KeycloakEvent): void {
    switch (event.type) {
      case KeycloakEventType.OnAuthError:
        this._logged$.next(false);
        break;
      case KeycloakEventType.OnAuthLogout:
        this._logged$.next(false);
        break;
      case KeycloakEventType.OnAuthRefreshError:
        this._logged$.next(false);
        break;
      case KeycloakEventType.OnAuthRefreshSuccess:
        this._logged$.next(true);
        break;
      case KeycloakEventType.OnAuthSuccess:
        this._logged$.next(true);
        break;
      case KeycloakEventType.OnReady:
        break;
      case KeycloakEventType.OnTokenExpired:
        this._logged$.next(false);
        break;
      default:
        break;
    }
  }
}
