import { Component, OnInit, Input } from '@angular/core';

import { AppInstance } from '../../instances/app-instance';
import { AppInstanceService } from '../../instances/app-instance.service';
import { Application } from '../../applications/application';

@Component({
  selector: 'app-instance-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AppInstanceListComponent implements OnInit {
  private _app: Application;

  instances: AppInstance[];

  @Input()
  set application(app: Application) {
    if (app !== undefined) {
      this._app = app;
      this.getAppInstances();
    }
  }

  get application(): Application {
    return this._app;
  }

  constructor(private instanceService: AppInstanceService) {}

  ngOnInit() {}

  getAppInstances(): void {
    this.instanceService
      .getAppInstances(this.application)
      .subscribe(instances => (this.instances = instances));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.instanceService.addAppInstance({ name } as AppInstance).subscribe(instance => {
      this.instances.push(instance);
    });
  }

  delete(instance: AppInstance): void {
    this.instances = this.instances.filter(a => a !== instance);
    this.instanceService.deleteAppInstance(instance).subscribe();
  }
}
