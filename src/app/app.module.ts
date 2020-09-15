import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './features/layouts/default/default.module';
import { KeycloakAngularModule } from 'keycloak-angular';

import { CoreModule } from './features/core/core.module';
import { TokenInterceptor } from './features/shared/keycloak-auth/interceptor';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakAuthModule } from './features/shared/keycloak-auth/keycloak-auth.module';
import { MoodleComponent } from './features/modules/moodle/moodle.component';
import { AskbotComponent } from './features/modules/askbot/askbot.component';
import { MatchmakingComponent } from './features/modules/matchmaking/matchmaking.component';
import { CroupierComponent } from './features/modules/croupier/croupier.component';
import { ZammadComponent } from './features/modules/zammad/zammad.component';

// Import utils components

@NgModule({
  declarations: [
    AppComponent,
    MoodleComponent,
    AskbotComponent,
    MatchmakingComponent,
    ZammadComponent,
    CroupierComponent
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    DefaultModule,
    CoreModule,
    KeycloakAuthModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
