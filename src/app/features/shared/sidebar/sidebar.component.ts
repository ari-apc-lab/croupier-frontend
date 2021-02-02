import { Component, OnInit } from '@angular/core';
import { AuthService } from '../keycloak-auth/auth.service';
import { KeycloakEvent, KeycloakEventType } from 'keycloak-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userProfile;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  userMessage: string;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('email')) {
      this.setValues({
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email')
      });
    }
    this.authService.keycloakEvents$.subscribe(event => this.keycloakEventTriggered(event));
  }

  setValues(userProfile): void {
    this.firstName = userProfile.firstName;
    this.lastName = userProfile.lastName;
    this.userName = userProfile.username;
    this.email = userProfile.email;
  }

  clearValues(): void {
    this.firstName = null;
    this.lastName = null;
    this.userName = null;
    this.email = null;
  }

  private keycloakEventTriggered(event: KeycloakEvent): void {
    switch (event.type) {
      case KeycloakEventType.OnAuthError:
      case KeycloakEventType.OnAuthLogout:
      case KeycloakEventType.OnAuthRefreshError:
        this.clearValues();
        break;
      case KeycloakEventType.OnAuthSuccess:
      case KeycloakEventType.OnAuthRefreshSuccess:
        this.authService.getKeycloakInstance().loadUserProfile().success(profile => {
          this.setValues(profile);
        });
        break;
      default:
        break;
    }
  }

}
