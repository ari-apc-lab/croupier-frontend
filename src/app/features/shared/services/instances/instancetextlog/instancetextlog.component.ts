import { Component, OnInit, Input } from '@angular/core';

import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';

@Component({
  selector: 'app-instancetextlog',
  templateUrl: './instancetextlog.component.html',
  styleUrls: ['./instancetextlog.component.css']
})
export class InstancetextlogComponent implements OnInit {

  private _instance: AppInstance;

  logs = '';
  last = 0;
  status = '';

  @Input()
  set instance(instance: AppInstance) {
    if (instance !== undefined) {
      this._instance = instance;
      this.getAppInstanceEvents();
    }
  }

  get instance(): AppInstance {
    return this._instance;
  }

  constructor(private instanceService: AppInstanceService) {}

  ngOnInit() {}

  getAppInstanceEvents(): void {
    this.instanceService.getAppInstanceEvents(this._instance.id).subscribe(response => {
      if (response && response.body) {
        const data = JSON.parse(response.body);
        this.status = data.status;
        this.last = data.last;
        // TODO parse: logs <- data.body.logs
      } else {
        this.last = 0;
        this.logs = '';
        // TODO reset status
      }
    });
  }

}
