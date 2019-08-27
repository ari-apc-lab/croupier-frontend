import { Component, OnInit } from '@angular/core';

import { AppInstance } from '../../instances/app-instance';
import { AppInstanceService } from '../../instances/app-instance.service';

@Component({
  selector: 'app-instance-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AppInstanceListComponent implements OnInit {
  instances: AppInstance[];

  constructor(private instanceService: AppInstanceService) {}

  ngOnInit() {
    this.getAppInstances();
  }

  getAppInstances(): void {
    this.instanceService
      .getAppInstances()
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
