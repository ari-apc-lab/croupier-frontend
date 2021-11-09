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

@Component({
  selector: 'app-applist',
  templateUrl: './applist.component.html',
  styleUrls: ['./applist.component.css']
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

  constructor(
    private appService: ApplicationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.appService.getApplications().subscribe(apps => (this.applications = apps));
  }

  add() {
    this.success = false;
    if (!this.addForm.valid) {
      markAllAsDirty(this.addForm);
      return;
    }

    // console.log(this.addForm.value);
    let file = this.addForm.get('blueprint_file').value;
    let date = new Date();


    const jsZip = require('jszip');
   /* jsZip.loadAsync(fileList[0]).then((zip) => { // <----- HERE
      Object.keys(zip.files).forEach((filename) => { // <----- HERE
        zip.files[filename].async('string').then((fileData) => { // <----- HERE
          this.fileData = this.fileData + '**$$##$$**' + fileData;
        });
      });
    });*/

    console.log('####', this.addForm.get('blueprint_file').value)
    this.addForm.get('created').setValue(date.toISOString());
    this.addForm.get('updated').setValue(date.toISOString());
    this.addForm.get('main_blueprint_file').setValue('blueprint_publish_demo.yaml');


    this.appService
      .addApplication(this.addForm.value)
      .pipe(
        uploadProgress(progress => (this.progress = progress)),
        toResponseBody()
      )
      .subscribe((app: Application) => {
        this.applications.push(app);
        this.progress = 0;
        this.success = true;
        this.addForm.reset();
      });
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
    let url = '/apps/detail/' + application.id
    this.router.navigate([url])
  }

  displayFormNewApp() {
    this.displayFormNew = true;
  }

  hideFormNew() {
    this.displayFormNew = false;
  }

}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}
