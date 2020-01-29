import { Component, OnInit, Input } from '@angular/core';

import { AppInstance } from '../../instances/app-instance';
import { AppInstanceService } from '../../instances/app-instance.service';
import { Application } from '../../applications/application';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { requiredFileType } from 'src/app/shared/utils/file-upload/update-file-validators';
import {
  uploadProgress,
  toResponseBody
} from 'src/app/shared/utils/file-upload/file-upload.component';

@Component({
  selector: 'app-instance-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AppInstanceListComponent implements OnInit {
  private _app: Application;

  instances: AppInstance[];

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

  progress = 0;
  addForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    inputs_file: new FormControl(null, [Validators.required, requiredFileType('yaml')])
  });
  success = false;

  constructor(private instanceService: AppInstanceService) {}

  ngOnInit() {}

  getAppInstances(): void {
    this.instanceService
      .getAppInstances(this.application)
      .subscribe(instances => (this.instances = instances));
  }

  add() {
    this.success = false;
    if (!this.addForm.valid) {
      markAllAsDirty(this.addForm);
      return;
    }

    this.addForm.value['app'] = this._app.name

    this.instanceService
      .addAppInstance(this.addForm.value)
      .pipe(
        uploadProgress(progress => (this.progress = progress)),
        toResponseBody()
      )
      .subscribe((instance: AppInstance) => {
        this.instances.push(instance);
        this.progress = 0;
        this.success = true;
        this.addForm.reset();
      });
  }

  hasError(field: string, error: string) {
    const control = this.addForm.get(field);
    return control.dirty && control.hasError(error);
  }

  delete(instance: AppInstance): void {
    this.instances = this.instances.filter(a => a !== instance);
    this.instanceService.deleteAppInstance(instance).subscribe();
  }
}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}
