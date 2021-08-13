import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../applications/application';

@Component({
  selector: 'app-instance-dashboard',
  templateUrl: './instance-dashboard.component.html',
  styleUrls: ['./instance-dashboard.component.css']
})
export class InstanceDashboardComponent implements OnInit {

  private _app: Application;
  @Input()
  set application(app: Application) {
    if (app !== undefined) {
      this._app = app;
    //  this.getAppInstances();
    }
  }

  constructor() { }
  

  ngOnInit(): void {
  }

}
