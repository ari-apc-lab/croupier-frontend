import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InstancesRoutingModule } from './instances-routing.module';
import { UtilsModule } from '../../utils/utils.module';
import { KeycloakAuthModule } from '../../keycloak-auth/keycloak-auth.module';

import { InstancedetailComponent } from './instancedetail/instancedetail.component';
import { InstancelistComponent } from './instancelist/instancelist.component';
import { InstancetextlogComponent } from './instancetextlog/instancetextlog.component';

@NgModule({
  declarations: [InstancedetailComponent, InstancelistComponent, InstancetextlogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InstancesRoutingModule,
    UtilsModule,
    KeycloakAuthModule
  ],
  exports: [InstancelistComponent]
})
export class InstancesModule { }
