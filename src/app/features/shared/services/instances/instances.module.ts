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
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MessagesModule} from 'primeng/messages';
import {DropdownModule} from 'primeng/dropdown';
import {MatButtonModule} from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import {MatTabsModule} from '@angular/material/tabs'; 
import { TextEditorComponent } from '../../text-editor/text-editor.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { ExecutionModule } from '../executions/executions.module';
import {TabViewModule} from 'primeng/tabview';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import { CodemirrorModule } from '@ctrl/ngx-codemirror';


@NgModule({
  declarations: [
    InstancedetailComponent,
    InstancelistComponent,
    InstancetextlogComponent,
    InstanceDashboardComponent,
    InstanceFormComponent,
    TextEditorComponent,

  ],
  imports: [
    CommonModule,
    CodemirrorModule,
    FormsModule,
    ReactiveFormsModule,
    InstancesRoutingModule,
    UtilsModule,
    KeycloakAuthModule,
    MatIconModule,
    InputTextModule,
    DialogModule,
    TableModule,
    ProgressSpinnerModule,
    MatGridListModule,
    MessagesModule,
    DropdownModule,
    MatButtonModule,
    MatBadgeModule,
    TabMenuModule,
    MatTabsModule,
    ToggleButtonModule,
    ButtonModule,
    ToastModule,
    ExecutionModule,
    TabViewModule,
    MatPaginatorModule
  ],
  exports: [
    InstancelistComponent,
    InstanceDashboardComponent,
    InstanceFormComponent,
    TextEditorComponent,
  ]
})
export class InstancesModule { }
