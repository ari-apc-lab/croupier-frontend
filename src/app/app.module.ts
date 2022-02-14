import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './features/layouts/default/default.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

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
import { CkanComponent } from './features/modules/ckan/ckan.component';
import { VisualizerComponent } from './features/modules/visualizer/visualizer.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { HeaderComponent } from './features/shared/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LandingPageModule } from './features/landing-page/landing-page.module';
import { environment } from 'src/environments/environment';
import {CarouselModule} from 'primeng/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomKeycloakService } from './features/shared/keycloak-auth/custom-keycloak.service';
import { CookiesPolicyComponent } from './features/landing-page/cookies-banner/cookies-policy/cookies-policy.component';
import {ButtonModule} from 'primeng/button';
import { CookiesBannerComponent } from './features/landing-page/cookies-banner/cookies-banner.component';
import { GettingStartedModule } from './features/getting-started/getting-started.module';
import { CoviseVisualizeComponent } from './features/modules/covise-visualize/covise-visualize.component';
// Import utils components

@NgModule({
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    DefaultModule,
    LandingPageModule,
    GettingStartedModule,
    CoreModule,
    KeycloakAuthModule.forRoot(),
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    CarouselModule,
    ButtonModule,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    MoodleComponent,
    AskbotComponent,
    MatchmakingComponent,
    ZammadComponent,
    CroupierComponent,
    CkanComponent,
    VisualizerComponent,
    CookiesPolicyComponent,
    CookiesBannerComponent,
    CoviseVisualizeComponent,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      deps: [ CustomKeycloakService ],

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
