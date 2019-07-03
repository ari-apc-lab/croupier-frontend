import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { AppDetailComponent } from './app-detail/app-detail.component';

import { AppAuthGuard } from './app.authguard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'apps', component: ApplicationsComponent },
  {
    path: 'detail/:id',
    component: AppDetailComponent,
    canActivate: [AppAuthGuard]
    // data: { roles: ['Developer'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule {}
