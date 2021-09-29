import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { ApplicationsModule } from '../shared/services/applications/applications.module';
import { DashboardRoutingModule } from '../shared/services/dashboard/dashboard-routing.module';
import { LandingPageComponent } from './landing-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider'; 
import {CarouselModule} from 'primeng/carousel';
import {MatButtonModule} from '@angular/material/button'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    CarouselModule,
    MatButtonModule,
    FontAwesomeModule,
    SidebarModule,
    ButtonModule
    
  ],
  exports: [
    LandingPageComponent,
    MatIconModule,
  ]
})
export class LandingPageModule {}