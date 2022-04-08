import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { Application } from '../../applications/application';
import { ApplicationService } from '../../applications/application.service';
import { ExecutionsService } from '../../executions/executions.service';
import { AppInstance } from '../../instances/app-instance';
import { AppInstanceService } from '../../instances/app-instance.service';

@Component({
  selector: 'application-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService, PrimeNGConfig]
})
export class DashboardComponent implements OnInit {

  applications: Application[]; // display the apps in the screen (3 units)
  appList = []; // store all the apps to manage other functionalities.
  instances: any[];
  executions: any[];
  advertisedApps: any[];

  constructor(
    private applicationService: ApplicationService,
    private instanceService: AppInstanceService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private executionService: ExecutionsService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    const t = this;
    this.getApplications();
    setTimeout(function(){
      t.getLatestsInstances();
      t.getLatestsExecutions()
      t.getAdvertisedApps()
    }, 1000);

    
  }

  getApplications(): void {
    this.applicationService
      .getApplications()
      .subscribe(
        (applications) => {
          applications.sort(function (a, b) {
            if (a['created'] > b['created']) {
              return -1;
            }
            if (a['created'] < b['created']) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });
          this.appList = applications;
          this.applications = applications.slice(0,3);
      },
      (err) => {
        console.error(err);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error getting the application list!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      }
    );
  }

  getLatestsInstances() {
    this.instanceService.getInstancesList().subscribe(
      (data) => {
        data.sort( (a, b) => {
          if (a['created'] > b['created']) {
            return -1;
          }
          if (a['created'] < b['created']) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });

        data.forEach(element => {
          element['app_name'] = this.getInstnceAppName(element.app);
        });

        this.instances = data.slice(0, 3);
      },
      (err) => {
        console.error(err);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error getting last instances!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      }
    );
  }

  getLatestsExecutions() {
    this.executionService.getExecutions().subscribe(
      (data) => {
        data.sort( (a, b) => {
          if (a['created'] > b['created']) {
            return -1;
          }
          if (a['created'] < b['created']) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });

        this.executions = data.slice(0, 3);
      }
    )
  }

  getAdvertisedApps() {
    this.appList.forEach(element => {
      if (element['is_advertised']) {
        this.advertisedApps.push(element);
      }
    });

  }

  getInstnceAppName(appId) {
    let appName = '';
    const name =  this.appList.find(element => element.id === appId);
    if (name) {
      appName = name.name;
    } else {
      appName = '';
    }

    return appName;
  }

}
