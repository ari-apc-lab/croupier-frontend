import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ExecutionsComponent } from './executions.component';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MatIconModule,
    ButtonModule,
    DialogModule,
    ProgressBarModule
  ],
  declarations: [
    ExecutionsComponent
  ],
  exports: [
    ExecutionsComponent
   ]
})
export class ExecutionModule { }
