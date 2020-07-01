import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './features/layouts/default/default.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { AddappComponent } from './features/dashboard/addapp/addapp.component';

import { MoodleComponent } from './features/modules/moodle/moodle.component';
import { AskbotComponent } from './features/modules/askbot/askbot.component';
import { MatchmakingComponent } from './features/modules/matchmaking/matchmaking.component';

import { AppAuthGuard } from './features/shared/keycloak-auth/app.authguard';

const routes: Routes = [

  // Routes - 1  
  /*{ 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full'
  },
  { 
    path: 'dashboard', 
    component: DefaultComponent, 
    loadChildren: () => import('./features/shared/services/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: 'apps', 
    component: DefaultComponent, 
    loadChildren: () => import('./features/shared/services/applications/applications.module').then(m => m.ApplicationsModule)
  },
  { 
    path: 'instances', 
    component: DefaultComponent, 
    loadChildren: () => import('./features/shared/services/instances/instances.module').then(m => m.InstancesModule) 
  },
  { 
    path: 'module/moodle', 
    component: MoodleComponent 
  },
  { 
    path: 'module/askbot', 
    component: AskbotComponent 
  },
  { 
    path: 'module/matchmaking', 
    component: MatchmakingComponent 
  }*/

  // Routes
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [
      {
        path: '',
        // component: DashboardComponent,
        loadChildren: () => import('./features/shared/services/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ],
  },
  {
    path: 'apps',
    component: DefaultComponent,
    children: [
      {
        path: '',
        // component: AddappComponent
        loadChildren: () => import('./features/shared/services/applications/applications.module').then(m => m.ApplicationsModule)
      }
    ]
  },
  {
    path: 'instances',
    component: DefaultComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/shared/services/instances/instances.module').then(m => m.InstancesModule) 
      }
    ]
  },
  {
    path: 'module',
    component: DefaultComponent,
    children: [
      {
        path: 'moodle',
        component: MoodleComponent
      },
      {
        path: 'askbot',
        component: AskbotComponent
      },
      {
        path: 'matchmaking',
        component: MatchmakingComponent
      }
    ]
  }
  // Routes - 3
  /*{ 
  path: '', 
  component: DefaultComponent,
  children: [{ 
    path: '', component: DashboardComponent
  },
  {
    path: 'apps', component: AddappComponent
  },
  {
    path: 'module/moodle', component: MoodleComponent
  },
  {
    path: 'module/askbot', component: AskbotComponent
  },
  {
    path: 'module/matchmaking', component: MatchmakingComponent
  }]
}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
