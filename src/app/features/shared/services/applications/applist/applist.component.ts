import { Component, OnInit } from '@angular/core';
import { Application } from '../application';

import { ApplicationService } from '../application.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap, filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';

import {} from '../../../utils/utils.module';

import { requiredFileType } from '../../../utils/file-upload/update-file-validators';
import { uploadProgress, toResponseBody } from '../../../utils/file-upload/file-upload.component';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import {Message, MessageService, PrimeNGConfig} from 'primeng/api';
import * as fs from 'fs'

@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.css'],
  providers: [MessageService, PrimeNGConfig],
})
export class ApplistComponent implements OnInit {

  applications: Application[];
  displayFormNew = false;
  progress = 0;
  addForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    created: new FormControl(null),
    updated: new FormControl(null),
    main_blueprint_file: new FormControl(null),
    blueprint_file: new FormControl(null, [Validators.required, requiredFileType('zip')])
  });
  success = false;
  advertisedApps: any[];
  newApps: any[];
  pagedApplications: any[];
  pageSizeOptions: number[] = [5, 10, 20, 30];
  pageSize: number = 10;

  constructor(
    private appService: ApplicationService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
    ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getApplications();
    const t = this;
    setTimeout(function(){
      t.getAdvertisedApps();
    }, 1000);
  }

  getBPFileName() {
    const file = this.addForm.get('blueprint_file').value;
    const jsZip = require('jszip');
    jsZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        if (filename.includes('.yaml')) {
          const slashPosition = filename.indexOf('/');
          const yamlFile = filename.slice(slashPosition + 1, filename.length);
          this.addForm.get('main_blueprint_file').setValue(yamlFile);
        }
      });
    });
  }

  getApplications(): void {
    this.appService.getApplications().subscribe(apps => {
      this.applications = apps;
      this.pagedApplications = apps.slice(0, 10);
    });
  }


  add() {
    this.messageService.add({severity: 'info', summary: 'Saving', detail: 'The application is being saved in the server, please wait!'});
    this.success = false;
    if (!this.addForm.valid) {
      markAllAsDirty(this.addForm);
      return;
    }

    const date = new Date();
    this.addForm.get('created').setValue(date.toISOString());
    this.addForm.get('updated').setValue(date.toISOString());

    this.appService
      .addApplication(this.addForm.value)
      .pipe(
        uploadProgress(progress => (this.progress = progress)),
        toResponseBody()
      )
      .subscribe(
        (app: Application) => {
          this.messageService.clear();
          this.applications.push(app);
          this.progress = 0;
          this.success = true;
          this.addForm.reset();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Application created successfully!'});
          setTimeout(() => {
            this.messageService.clear();
          }, 5000);
        },
        (err) => {
          console.error(err);
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error saving application!'});
          setTimeout(() => {
            this.messageService.clear();
          }, 5000);
        }
      );
  }

  hasError(field: string, error: string) {
    const control = this.addForm.get(field);
    return control.dirty && control.hasError(error);
  }

  delete(app: Application): void {
    this.applications = this.applications.filter(a => a !== app);
    this.appService.deleteApplication(app).subscribe();
  }

  openApp(application: Application) {
    const url = '/apps/detail/' + application.id;
    this.router.navigate([url]);
  }

  displayFormNewApp() {
    this.displayFormNew = true;
  }

  hideFormNew() {
    this.displayFormNew = false;
  }

  getAdvertisedApps() {
    this.applications.forEach(element => {
      if (element['is_advertised']) {
        this.advertisedApps.push(element);
      }
    });

  }

  OnPageChange(event){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.applications.length){
      endIndex = this.applications.length;
    }
    this.pagedApplications = this.applications.slice(startIndex, endIndex);
  }

}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}
