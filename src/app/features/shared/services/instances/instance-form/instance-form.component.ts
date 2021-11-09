import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toResponseBody, uploadProgress } from '../../../utils/file-upload/file-upload.component';
import { requiredFileType } from '../../../utils/file-upload/update-file-validators';
import { Application } from '../../applications/application';
import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';

@Component({
  selector: 'app-instance-form',
  templateUrl: './instance-form.component.html',
  styleUrls: ['./instance-form.component.css']
})
export class InstanceFormComponent implements OnInit, OnChanges {

  constructor(private instanceService: AppInstanceService) { }


  private _app: Application;
  success = false;
  progress = 0;
  addForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    inputs_file: new FormControl(null, [Validators.required, requiredFileType('yaml')])
  });
  instances: AppInstance[];

  @Input()
  set application(app: Application) {
    if (app !== undefined) {
      this._app = app;
    }
  }

  @Input() app;


  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log('applicatione', this.app)
    this._app = this.app;
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

  getApp() {
    console.log('app', this._app);
  }

}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}
