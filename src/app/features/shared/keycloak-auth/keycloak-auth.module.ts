import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AppAuthGuard } from './app.authguard';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoginComponent],
  /* NO PROVIDERS HERE */
})
export class KeycloakAuthModule {
  static forRoot() {
    return {
      ngModule: KeycloakAuthModule,
      providers: [AuthService, AppAuthGuard]
    };
  }
}
