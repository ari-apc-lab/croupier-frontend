import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstancelistComponent } from './instancelist/instancelist.component';
import { InstancedetailComponent } from './instancedetail/instancedetail.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: InstancelistComponent },
    { path: 'detail/:id', component: InstancedetailComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstancesRoutingModule {}
