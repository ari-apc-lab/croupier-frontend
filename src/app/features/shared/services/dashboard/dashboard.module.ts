import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ApplicationsModule } from '../applications/applications.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ApplicationsModule
  ]
})
export class DashboardModule { }
