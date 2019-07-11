import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MessageService } from './message.service';

import { LayoutComponent } from './layout/layout.component';
import { MessagesComponent } from './messages/messages.component';
import { KeycloakAuthModule } from '../keycloak-auth/keycloak-auth.module';

@NgModule({
  declarations: [LayoutComponent, MessagesComponent],
  imports: [CommonModule, RouterModule, KeycloakAuthModule],
  exports: [LayoutComponent, MessagesComponent]
  /* NO PROVIDERS HERE */
})
export class UtilsModule {
  static forRoot() {
    return {
      ngModule: UtilsModule,
      providers: [MessageService]
    };
  }
}
