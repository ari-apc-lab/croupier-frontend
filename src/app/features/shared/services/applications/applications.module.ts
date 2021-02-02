import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UtilsModule } from '../../utils/utils.module';
import { KeycloakAuthModule } from '../../keycloak-auth/keycloak-auth.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { InstancesModule } from '../instances/instances.module';
import { ApplicationService } from './application.service';

import { AppdetailComponent } from './appdetail/appdetail.component';
import { ApplistComponent } from './applist/applist.component';
import { AppsearchComponent } from './appsearch/appsearch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationsRoutingModule,
    UtilsModule,
    KeycloakAuthModule,
    InstancesModule
  ],
  declarations: [
    AppdetailComponent,
    ApplistComponent,
    AppsearchComponent
  ],
  exports: [AppsearchComponent]
})
export class ApplicationsModule {
  static forRoot() {
    return {
      ngModule: ApplicationModule,
      providers: [ApplicationService]
    };
  }
}
