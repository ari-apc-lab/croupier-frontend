import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';
import { Application } from '../../applications/application';
import { requiredFileType } from '../../../utils/file-upload/update-file-validators';
import { uploadProgress, toResponseBody } from '../../../utils/file-upload/file-upload.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instancelist',
  templateUrl: './instancelist.component.html',
  styleUrls: ['./instancelist.component.css']
})
export class InstancelistComponent implements OnInit {

  private _app: Application;

  instances: AppInstance[];
  pagedInstances: AppInstance[];
  pageSize: number = 10;  //displaying three cards each row
  pageSizeOptions: number[] = [5, 10, 20, 30];
  @Input() reloadInstList: boolean;
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

  constructor(
    private instanceService: AppInstanceService,
    private router: Router
  ) {}

  delete(instance: AppInstance): void {
    this.instances = this.instances.filter(a => a !== instance);
    this.instanceService.deleteAppInstance(instance).subscribe();
  }

  ngOnInit() {
  }

  getAppInstances(): void {
    this.instanceService
      .getAppInstances(this.application)
      .subscribe(instances => {
        this.instances = instances;
        this.pagedInstances = instances.slice(0, 10);
      });
  }

  /** todo */
  search() {

  }

  open(inst: AppInstance) {
    const url = '/instances/detail/' + inst.id;
    this.router.navigate([url]);
  }

  OnPageChange(event){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.instances.length){
      endIndex = this.instances.length;
    }
    this.pagedInstances = this.instances.slice(startIndex, endIndex);
  }

}


