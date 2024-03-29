import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './features/layouts/default/default.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { AddappComponent } from './features/dashboard/addapp/addapp.component';

import { CroupierComponent } from './features/modules/croupier/croupier.component';
import { MoodleComponent } from './features/modules/moodle/moodle.component';
import { AskbotComponent } from './features/modules/askbot/askbot.component';
import { MatchmakingComponent } from './features/modules/matchmaking/matchmaking.component';
import { ZammadComponent } from './features/modules/zammad/zammad.component';
import { CkanComponent } from './features/modules/ckan/ckan.component';
import { VisualizerComponent } from './features/modules/visualizer/visualizer.component';

import { AppAuthGuard } from './features/shared/keycloak-auth/app.authguard';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { KeycloakAuthGuard } from 'keycloak-angular';
import { AppdetailComponent } from './features/shared/services/applications/appdetail/appdetail.component';
import { InstancedetailComponent } from './features/shared/services/instances/instancedetail/instancedetail.component';
import { CookiesPolicyComponent } from './features/landing-page/cookies-banner/cookies-policy/cookies-policy.component';
import { GettingStartedComponent } from './features/getting-started/getting-started.component';
import { CoviseVisualizeComponent } from './features/modules/covise-visualize/covise-visualize.component';
import { UserProfileComponent } from './features/shared/user-profile/user-profile.component';
import { ExecutionsComponent } from './features/shared/services/executions/executions.component';

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
    loadChildren: () => import('./features/shared/services/instances/instances.module').then(m => m.InstancesModule),
   
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
 /* {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },*/
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
    canActivate:  [AppAuthGuard]
  },
  {
    path: 'apps',
    component: DefaultComponent,
    children: [
      {
        path: '',
        // component: AddappComponent
        loadChildren: () => import('./features/shared/services/applications/applications.module').then(m => m.ApplicationsModule)
      },
      {
        path: 'detail/:id',
        component: AppdetailComponent
        
      }
    ],
    canActivate:  [AppAuthGuard]
  },
  {
    path: 'instances',
    component: DefaultComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/shared/services/instances/instances.module').then(m => m.InstancesModule)
      },
      {
        path: 'detail/:id',
        component: InstancedetailComponent
      }
    
  
    ],
    canActivate:  [AppAuthGuard]
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
      },
      {
        path: 'zammad',
        component: ZammadComponent
      },
      {
        path: 'croupier',
        component: CroupierComponent
      },
      {
        path: 'ckan',
        component: CkanComponent
      },
      {
        path: 'visualizer',
        component: VisualizerComponent
      },
      {
        path: 'covise',
        component: CoviseVisualizeComponent
      },
    ],
    canActivate:  [AppAuthGuard]
  },
  {
    path: '',
    component: LandingPageComponent
  },
 /* {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        // component: DashboardComponent,
     //   loadChildren: () => import('./features/shared/shared.module').then(m => m.SharedModule)
        loadChildren: () => import('./features/landing-page/landing-page.module').then(m => m.LandingPageModule),
        component: LandingPageComponent
      }
    ],
  },*/

  {
    path: 'executions',
    component: DefaultComponent,
    children: [
      {
        path: '',
        // component: DashboardComponent,
     //   loadChildren: () => import('./features/shared/shared.module').then(m => m.SharedModule)
        loadChildren: () => import('./features/shared/services/executions/executions.module').then(m => m.ExecutionModule),
        component: ExecutionsComponent
      }
    ],
  },
  {
    path: 'cookies-policy',
    component: CookiesPolicyComponent
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent
  },
  {
    path: 'profile',
    component: DefaultComponent,
    children: [
      {
        path: '',
        // component: DashboardComponent,
     //   loadChildren: () => import('./features/shared/shared.module').then(m => m.SharedModule)
        loadChildren: () => import('./features/shared/user-profile/user-profile.module').then(m => m.UserProfileModule),
        component: UserProfileComponent
      }
    ],
    canActivate:  [AppAuthGuard]
  },

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
