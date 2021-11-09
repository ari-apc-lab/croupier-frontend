import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';

@Component({
  selector: 'app-instancetextlog',
  templateUrl: './instancetextlog.component.html',
  styleUrls: ['./instancetextlog.component.css']
})
export class InstancetextlogComponent implements OnInit, OnChanges {

  private _instance: AppInstance;

  logs;
  last = 0;
  status = '';
  first = 0;
  rows = 10;


  /*
  @Input()
  set instance(instance: AppInstance) {
    if (instance !== undefined) {
      this._instance = instance;
      this.getAppInstanceEvents();
    }
  }
*/
  @Input() instance;

  /*
  get instance(): AppInstance {
    return this._instance;
  }
*/
  constructor(private instanceService: AppInstanceService) {}

  ngOnInit() {
    
  }

  ngOnChanges() {
    this._instance = this.instance;
    this.getAppInstanceEvents()
  }

  getAppInstanceEvents(): void {
    console.log('asdasdasdasdasdasdasdasdas')
    if (this._instance) {
      this.instanceService.getAppInstanceEvents(this._instance.id).subscribe(response => {
        console.log('response of logs:', response)
        if (response) {
          //const data = JSON.parse(response.body);
       //   this.status = response.status;
        //  this.last = response.last;
          this.logs = response['logs'];
          console.log('logs ---->',this.logs)
          // TODO parse: logs <- data.body.logs
        } else {
          this.last = 0;
          this.logs = '';
          // TODO reset status
        }
      });
    }
    
  }

}
