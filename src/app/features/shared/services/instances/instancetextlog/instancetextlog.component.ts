import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';
import * as LogsEventsStatus from '../../../../../../assets/json/logs_events.json';
import { Dropdown } from 'primeng/dropdown';
import { MessageService, PrimeNGConfig } from 'primeng/api';

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
  currentEventType = 'all';
  currentLogLevel = 'all';
  eventTypes = [];
  LogLevels = [];

  @Input() instance;

  constructor(
    private instanceService: AppInstanceService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
    ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
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
    this.getAppInstanceEvents(null, null);
  }

  getAppInstanceEvents(event_type, log_level): void {
    if (this._instance) {
      this.instanceService.getAppInstanceEvents(this._instance.id).subscribe(response => {
        console.log('response', response)
        if (response) {
          this.logs = response['logs'];
          // TODO parse: logs <- data.body.logs
          // Sort logs by timestamp (recentest before)
          this.logs = this.logs.sort((log1, log2) => {
            if (log1.timestamp > log2.timestamp) {
                return -1;
            }
            if (log1.timestamp < log2.timestamp) {
                return 1;
            }
            return 0;
          });
          this.permanentLogs = this.logs;
          this.filterLogs();
        } else {
          this.last = 0;
          this.logs = '';
          this.messageService.add({severity: 'error', summary: 'Error:', detail: 'Error getting execution logs for this instance.'});
          setTimeout(() => {
            this.messageService.clear();
          }, 5000);
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

  filterLogs() {
    var typeCode = this.currentType['code'];
    var eventTypeCode = this.currentEventType['code'];
    var logLevelCode = this.currentLogLevel['code'];

    if (this.isNullOrUndefined(typeCode)){
      typeCode = "all"
    }
    if (this.isNullOrUndefined(eventTypeCode)){
      eventTypeCode = "all"
    }
    if (this.isNullOrUndefined(logLevelCode)){
      logLevelCode = "all"
    }

    switch (typeCode) {
      case 'logs':
        this._filterLogs('cloudify_log', eventTypeCode, logLevelCode);
        break;
      case 'events':
        this._filterLogs('cloudify_event', eventTypeCode, logLevelCode);
        break;
      case 'all':
        this._filterLogs('all', eventTypeCode, logLevelCode);
        break;
    }
  }

  isNullOrUndefined = (value): value is null | undefined => {
    return value === null || value === undefined;
  }

  _filterLogs(type, event_type, log_level) {
    this.logs = [];

    this.permanentLogs.forEach(element => {
      if (('all' === type || element['type'] === type) &&
          ('all' === event_type || element['event_type'] === event_type) &&
          ('all' === log_level || element['level'] === log_level)) {
        this.logs.push(element);
      } 
    });

  }

  refreshLogs(level: Dropdown, eType: Dropdown) {
    this.getAppInstanceEvents(eType.value, level.value);
  }

  printIcon(code) {
    const icon = this.logsEventsStatus.find(element => element.code === code);
    if (icon.icon) {
      return icon.icon;
    }
  }

}
