import { Component } from '@angular/core';
// import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from './keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hidalgo Frontend';
  // userDetails: KeycloakProfile;

  constructor(private keycloakService: KeycloakService) {}

  // async ngOnInit() {
  //   if (await this.keycloakService.isLoggedIn()) {
  //     this.userDetails = await this.keycloakService.loadUserProfile();
  //   }
  // }

  // async doLogout() {
  //   await this.keycloakService.logout();
  // }
}
