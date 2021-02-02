import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeycloakAuthModule } from '../keycloak-auth/keycloak-auth.module';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MessageService } from './message.service';

import { MessagesComponent } from './messages/messages.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        KeycloakAuthModule,
        MatCardModule,
        MatIconModule
    ],
    declarations: [
        MessagesComponent,
        FileUploadComponent,
        ProgressComponent
    ],
    exports: [
        MessagesComponent,
        FileUploadComponent,
        ProgressComponent
    ]
})

export class UtilsModule {
    static forRoot(): ModuleWithProviders {
        return  {
          ngModule: UtilsModule,
          providers: [MessageService],
        } as ModuleWithProviders;
    }
}
