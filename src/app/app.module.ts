import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { UtilsModule } from './shared/utils/utils.module';
import { KeycloakAuthModule } from './shared/keycloak-auth/keycloak-auth.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    UtilsModule.forRoot(),
    KeycloakAuthModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
