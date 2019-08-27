import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppInstanceListComponent } from './list/list.component';
// import { AppInstanceDetailComponent } from './detail/app-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AppInstanceListComponent }
  // {
  //   path: 'detail/:id',
  //   component: AppInstanceListComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstancesRoutingModule {}
