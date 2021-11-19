import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
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
  inputsJSON = {}
  contentLines = [];

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

  getInputsFromYaml() {
    const file = this.addForm.get('inputs_file').value;
    console.log('up filed: ', file)

    const yaml = require('js-yaml');

    let fileReader = new FileReader();
    const x = fileReader.readAsText(file);
    let yamlContent;
   // let contentLines;


    fileReader.onload = (e) => {
      
      yamlContent = fileReader.result;

      this.contentLines = yamlContent.split('\n');
      let xLastKey = '';

      for (let i = 0; i < this.contentLines.length; i++) {
        const currentLine = this.contentLines[i];

        // exclude lines of comments in the yaml file.
        if (!currentLine.startsWith('#')) {
          let colonPosition = currentLine.indexOf(':');
          let key =  currentLine.substr(0, colonPosition).trim();
          let value = currentLine.substr(colonPosition +2, currentLine.length).trim();
          let chartPosition = 0;

          // difference between SCALAR, COLLECTON and MULTILINE COLLECTION
          // SCALAR
          if (key && value && key.charAt(0) != ' ' && !value.includes('|')) {
            this.inputsJSON[key] = this.getScalar(key, value).trim();
            xLastKey = key;
          } 
          // MULTILINE COLLECTION
          else if (currentLine.includes('|') && key.charAt(chartPosition) != ' ') {
            let result = this.getMultilineCollection(i,chartPosition);
            value = result.value;
            i = result.position;
            this.inputsJSON[key] = value.trim();
          }

          else if (value.length === 0) {
            let x = i + 1;
            this.inputsJSON[key] = {}
            while (x < this.contentLines.length) { // stops if not more lines in the array
              if (this.contentLines[x].charAt(1) == ' ') {
                colonPosition = this.contentLines[x].indexOf(':');
                let paramKey =  this.contentLines[x].substr(0, colonPosition).trim();
                value = this.contentLines[x].substr(colonPosition +1, this.contentLines[x].length);
                if (this.contentLines[x].includes(':') && value.charAt(1) != ' ' && !value.includes('|')) {
                  this.inputsJSON[key][paramKey] = this.getScalar(key, value).trim();
                } else if (this.contentLines[x].includes('|')) {
                  let result = this.getMultilineCollection(x,chartPosition);
                  this.inputsJSON[key][paramKey] = result.value.trim();
                }
                x++;
              } else {
                break; 
              }
            } 
          }
        }
      }

      console.log('Parsed values to JSON: ', this.inputsJSON);
    }
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
      if (this.contentLines[x].charAt(charPosition + 1) == ' ') {
      
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
