import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ApplicationsRoutingModule } from './applications-routing.module';

import { UtilsModule } from '../../shared/utils/utils.module';
import { KeycloakAuthModule } from '../../shared/keycloak-auth/keycloak-auth.module';

import { InstancesModule } from '../instances/instances.module';

import { AppListComponent } from './list/applications.component';
import { ApplicationSearchComponent } from './search/application-search.component';
import { AppDetailComponent } from './detail/app-detail.component';

@NgModule({
  declarations: [AppListComponent, ApplicationSearchComponent, AppDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationsRoutingModule,
    UtilsModule,
    KeycloakAuthModule,
    InstancesModule
  ],
  exports: [ApplicationSearchComponent]
})
export class ApplicationsModule {}
