import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InstancesRoutingModule } from './instances-routing.module';
import { UtilsModule } from '../../utils/utils.module';
import { KeycloakAuthModule } from '../../keycloak-auth/keycloak-auth.module';

import { InstancedetailComponent } from './instancedetail/instancedetail.component';
import { InstancelistComponent } from './instancelist/instancelist.component';
import { InstancetextlogComponent } from './instancetextlog/instancetextlog.component';
import {MatIconModule} from '@angular/material/icon'; 
import {InputTextModule} from 'primeng/inputtext';
import { InstanceDashboardComponent } from './instance-dashboard/instance-dashboard.component';
import { InstanceFormComponent } from './instance-form/instance-form.component';
import { AppModule } from 'src/app/app.module';
@NgModule({
  declarations: [
    InstancedetailComponent,
    InstancelistComponent,
    InstancetextlogComponent,
    InstanceDashboardComponent,
    InstanceFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InstancesRoutingModule,
    UtilsModule,
    KeycloakAuthModule,
    MatIconModule,
    InputTextModule
  ],
  exports: [
    InstancelistComponent,
    InstanceDashboardComponent,
    InstanceFormComponent
  ]
})
export class InstancesModule { }
