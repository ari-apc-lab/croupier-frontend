import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
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

  constructor(
    private instanceService: AppInstanceService,
    private http: HttpClient
    ) { }


  
  private _app: Application;
  success = false;
  progress = 0;
  addForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    inputs_file: new FormControl(null, [Validators.required, requiredFileType('yaml')])
  });
  instances: AppInstance[];
  inputsJSON = {}
  contentLines = [];

  @Input()
  set application(app: Application) {
    if (app !== undefined) {
      this._app = app;
    }
  }

  @Input() app;
  @Output() fileInputsJSON = new EventEmitter<any>();
  @Output() fileInputsText = new EventEmitter<any>();
  @Output() fileTitle = new EventEmitter<any>();


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

  getInputsFromYaml() {
    const file = this.addForm.get('inputs_file').value;
    console.log('test yaml', file);


    const yaml = require('js-yaml');
    
    let fileReader = new FileReader();
    const x = fileReader.readAsText(file);
    let yamlContent;
   // let contentLines;
    this.fileTitle.emit(file.name);
    fileReader.onload = (e) => {
      yamlContent = fileReader.result;
      this.fileInputsText.emit(yamlContent);
      console.log('inputs in text format: ', yamlContent);
      try {
        const doc = yaml.load(yamlContent);
        console.log(doc);
        this.fileInputsJSON.emit(doc);
      } catch (e) {
        console.log(e);
      }

    };
  }

  getScalar(key, value){
    this.inputsJSON[key] 
    let val = value.replace('\r', '');
    return val;
  }

  getMultilineCollection(position, charPosition) {
    let x = position + 1; // itinerator index for the collection lines.
    let value = '';
    while (x < this.contentLines.length) { // stops if not more lines in the array
      if (this.contentLines[x].charAt(charPosition + 1) === ' ') {
        value = value.concat(' ', this.contentLines[x].trim().replace('\r', '')) // + contentLines[i];
        x++;
      } else {
        break;
      }
    } 
    return {value: value, position: x}
  }
}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}
