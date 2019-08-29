import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InstancesRoutingModule } from './instances-routing.module';

import { UtilsModule } from '../../shared/utils/utils.module';
import { KeycloakAuthModule } from '../../shared/keycloak-auth/keycloak-auth.module';

import { AppInstanceListComponent } from './list/list.component';
import { InstanceDetailComponent } from './detail/detail.component';
import { InstanceLogComponent } from './text-log/log.component';

@NgModule({
  declarations: [
    AppInstanceListComponent,
    InstanceDetailComponent,
    InstanceLogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InstancesRoutingModule,
    UtilsModule,
    KeycloakAuthModule
  ],
  exports: [AppInstanceListComponent]
})
export class InstancesModule {}
