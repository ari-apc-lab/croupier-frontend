import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { UtilsModule } from './shared/utils/utils.module';
import { KeycloakAuthModule } from './shared/keycloak-auth/keycloak-auth.module';
import {KeycloakAngularModule} from 'keycloak-angular';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './shared/keycloak-auth/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    CoreModule,
    UtilsModule.forRoot(),
    KeycloakAuthModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
