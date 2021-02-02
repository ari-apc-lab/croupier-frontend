import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { UtilsModule } from './utils/utils.module';
import { KeycloakAuthModule } from './keycloak-auth/keycloak-auth.module';
// import { MessagesComponent } from './utils/messages/messages.component';
// import { FileUploadComponent } from './utils/file-upload/file-upload.component';
// import { ProgressComponent } from './utils/progress/progress.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { RouterModule } from '@angular/router';
import { AreaComponent } from './widgets/area/area.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';

import { MessageService } from './utils/message.service';

// import { AuthService } from './keycloak-auth/auth.service';
// import { AppAuthGuard } from './keycloak-auth/app.authguard';

@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatCardModule,
    MatGridListModule,
    UtilsModule,
    KeycloakAuthModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    // MessagesComponent,
    // FileUploadComponent,
    // ProgressComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    // MessagesComponent,
    // FileUploadComponent,
    // ProgressComponent
    UtilsModule,
    KeycloakAuthModule
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [MessageService]
      // providers: [MessageService, AuthService, AppAuthGuard]
    };
  }
}
