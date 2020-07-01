import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplistComponent } from './applist/applist.component';
import { AppdetailComponent } from './appdetail/appdetail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ApplistComponent },
  { path: 'detail/:id', component: AppdetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {}
