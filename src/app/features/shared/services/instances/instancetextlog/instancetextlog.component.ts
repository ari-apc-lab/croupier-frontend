import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';
import * as LogsEventsStatus from '../../../../../../assets/json/logs_events.json';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-instancetextlog',
  templateUrl: './instancetextlog.component.html',
  styleUrls: ['./instancetextlog.component.css']
})
/**
 * TODO's:
 *  - Filtros: 
 *    - event type.
 *    - log level.
 *    - acceso directo a los logs
 *  - Poner iconos
 */
export class InstancetextlogComponent implements OnInit, OnChanges {

  private _instance: AppInstance;

  logs;
  permanentLogs;
  last = 0;
  status = '';
  first = 0;
  rows = 10;
  logsEventsStatus;


  executionTypes = [
    {name: 'All', code: 'all'},
    {name: 'Logs', code: 'logs'},
    {name: 'Events', code: 'events'}
  ];
  currentType = 'all';
  eventTypes = [];
  LogLevels = [];

  @Input() instance;

  constructor(private instanceService: AppInstanceService) {}

  ngOnInit() {
    this.logsEventsStatus = LogsEventsStatus['default'];
    this.logsEventsStatus.forEach(element => {
      if (element.type === 'log') {
        this.LogLevels.push(element);
      } else {
        this.eventTypes.push(element);
      }
    });
  }

  ngOnChanges() {
    this._instance = this.instance;
    this.getAppInstanceEvents();
  }

  getAppInstanceEvents(): void {
    if (this._instance) {
      this.instanceService.getAppInstanceEvents(this._instance.id).subscribe(response => {
        console.log('response', response)
        if (response) {
          this.logs = response['logs'];
          this.permanentLogs = response['logs'];
          // TODO parse: logs <- data.body.logs
        } else {
          this.last = 0;
          this.logs = '';
          // TODO reset status
        }
      },
      (err)=> {
        console.log('error en el componente: ', err);
      });
    }
  }

  printLogEventStatus(code): string {
    if (code) {
      const title = this.logsEventsStatus.find(element => element.code === code);
      return title.title;
    }
    return;
  }

  changeType() {
    this.logs = [];
    const typeCode = this.currentType['code'];

    switch (typeCode) {
      case 'logs':
        this.loopForEach('cloudify_log', 'type');
        break;
      case 'events':
        this.loopForEach('cloudify_event', 'type');
        break;
      case 'all':
        this.logs = this.permanentLogs;
        break;
    }
  }

  changeEventType(type) {
    this.loopForEach(type.code, 'event_type');
  }

  changeLogLevel(level) {
    this.loopForEach(level.code, 'level');
  }

  loopForEach(key, attribute) {
    this.logs = [];
    this.permanentLogs.forEach(element => {
      if (element[attribute] === key) {
        this.logs.push(element);
      }
    });
  }

  restartFilters(level: Dropdown, eType: Dropdown) {
    level.clear(null);
    eType.clear(null);
    this.currentType = 'all';
    this.logs = this.permanentLogs;
  }

  printIcon(code) {
    const icon = this.logsEventsStatus.find(element => element.code === code);
    if (icon.icon) {
      return icon.icon;
    }
  }

}
