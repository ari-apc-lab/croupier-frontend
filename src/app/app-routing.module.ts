import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './shared/utils/layout/layout.component';

import { AppAuthGuard } from './shared/keycloak-auth/app.authguard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: './features/dashboard/dashboard.module#DashboardModule'
    // canActivate: [AppAuthGuard]
    // data: { roles: ['Developer']
  },
  {
    path: 'app',
    component: LayoutComponent,
    loadChildren: './features/applications/applications.module#ApplicationsModule'
  },
  {
    path: 'instance',
    component: LayoutComponent,
    loadChildren: './features/instances/instances.module#InstancesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule {}
