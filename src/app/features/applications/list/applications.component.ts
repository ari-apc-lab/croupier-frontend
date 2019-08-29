import { Component, OnInit } from '@angular/core';
import { Application } from '../application';

import { ApplicationService } from '../application.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap, filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';

import { requiredFileType } from 'src/app/shared/utils/file-upload/update-file-validators';
import {
  uploadProgress,
  toResponseBody
} from 'src/app/shared/utils/file-upload/file-upload.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class AppListComponent implements OnInit {
  applications: Application[];

  progress = 0;
  addForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    blueprint: new FormControl(null, [Validators.required, requiredFileType('zip')])
  });
  success = false;

  constructor(private appService: ApplicationService) {}

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
}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}
