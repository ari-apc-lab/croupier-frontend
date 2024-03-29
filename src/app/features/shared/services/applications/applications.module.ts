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
import {InputTextModule} from 'primeng/inputtext';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {SelectButtonModule} from 'primeng/selectbutton';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {InputNumberModule} from 'primeng/inputnumber';
import {MatBadgeModule} from '@angular/material/badge';
import {TabMenuModule} from 'primeng/tabmenu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import { TextEditorComponent } from '../../text-editor/text-editor.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ValueSetBrowserComponent } from './value-set-browser/value-set-browser.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';



@NgModule({
  imports: [
    CodemirrorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationsRoutingModule,
    UtilsModule,
    KeycloakAuthModule,
    InstancesModule,
    InputTextModule,
    MatTooltipModule,
    MatIconModule,
    MatExpansionModule,
    SelectButtonModule,
    MatSlideToggleModule,
    InputNumberModule,
    MatBadgeModule,
    TabMenuModule,
    MatTabsModule,
    MatGridListModule,
    ButtonModule,
    MessagesModule,
    TabViewModule,
    DropdownModule,
    ProgressSpinnerModule,
    DialogModule,
    ToastModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  declarations: [
    AppdetailComponent,
    ApplistComponent,
    AppsearchComponent,
    ValueSetBrowserComponent
   // TextEditorComponent
  ],
  exports: [AppsearchComponent, ValueSetBrowserComponent // TextEditorComponent
  ]
})
export class ApplicationsModule {
  static forRoot() {
    return {
      ngModule: ApplicationModule,
      providers: [ ApplicationService ]
    };
  }
}
