import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ApplicationsModule } from '../applications/applications.module';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MessagesModule} from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {PaginatorModule} from 'primeng/paginator';
import {MatPaginatorModule} from '@angular/material/paginator'; 

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ApplicationsModule,
    MatIconModule,
    MatGridListModule,
    MessagesModule,
    ProgressSpinnerModule,
    PaginatorModule,
    MatPaginatorModule
  ]
})
export class DashboardModule { }
