import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InstancesRoutingModule } from './instances-routing.module';

import { UtilsModule } from '../../shared/utils/utils.module';
import { KeycloakAuthModule } from '../../shared/keycloak-auth/keycloak-auth.module';

import { AppInstanceListComponent } from './list/list.component';
import { InstanceDetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [AppInstanceListComponent, InstanceDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    InstancesRoutingModule,
    UtilsModule,
    KeycloakAuthModule
  ],
  exports: [AppInstanceListComponent]
})
export class InstancesModule {}
