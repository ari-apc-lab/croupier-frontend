import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstancesRoutingModule } from './instances-routing.module';

import { AppInstanceListComponent } from './list/list.component';

@NgModule({
  declarations: [AppInstanceListComponent],
  imports: [CommonModule, InstancesRoutingModule],
  exports: [AppInstanceListComponent]
})
export class InstancesModule {}
