import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppListComponent } from './list/applications.component';
import { AppDetailComponent } from './detail/app-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AppListComponent },
  {
    path: 'detail/:id',
    component: AppDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
