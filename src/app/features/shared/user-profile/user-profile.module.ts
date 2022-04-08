import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserProfileComponent,
  ],
  exports: [ ]
})
export class UserProfileModule {
  static forRoot() {
    return {
      ngModule: UserProfileModule,
      providers: [
    /*    ApplicationService, {
        provide: MONACO_PATH,
        useValue: 'https://unpkg.com/monaco-editor@0.18.0/min/vs'
      }*/
    ]
    };
  }
}
