import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeycloakAuthModule } from '../keycloak-auth/keycloak-auth.module';

import { MessageService } from './message.service';

// import { MessagesComponent } from './messages/messages.component';
// import { FileUploadComponent } from './file-upload/file-upload.component';
// import { ProgressComponent } from './progress/progress.component';

@NgModule({
    // declarations: [MessagesComponent, FileUploadComponent, ProgressComponent],
    imports: [CommonModule, RouterModule, KeycloakAuthModule],
    // exports: [MessagesComponent, FileUploadComponent, ProgressComponent]
})

export class UtilsModule {
    static forRoot() {
        return {
            ngModule: UtilsModule,
            providers: [MessageService]
        };
    }
}
