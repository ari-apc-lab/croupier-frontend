import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { toResponseBody, uploadProgress } from '../../../utils/file-upload/file-upload.component';
import { requiredFileType } from '../../../utils/file-upload/update-file-validators';
import { Application } from '../../applications/application';
import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';


@Component({
  selector: 'app-instance-form',
  templateUrl: './instance-form.component.html',
  styleUrls: ['./instance-form.component.css'],
  providers: [MessageService]
})
export class InstanceFormComponent implements OnInit, OnChanges {

  constructor(
    private instanceService: AppInstanceService,
    private http: HttpClient,
    private messageService: MessageService
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
  yamlContentText = '';
  yamlContentBackUp = '';
  fileTitle = '';
  fileStatus = '0'; // original, modified, modified and saved changes

  @Input()
  set application(app: Application) {
    if (app !== undefined) {
      this._app = app;
    }
  }

  @Input() app;
  @Output() fileInputsJSON = new EventEmitter<any>();
  @Output() fileInputsText = new EventEmitter<any>();
  //@Output() fileTitle = new EventEmitter<any>();


  ngOnInit(): void {
    this.manageStatus('0');
    
  }

  ngOnChanges() {
    this._app = this.app;
    this.manageStatus('0');
  }

  add() {
    this.success = false;
    if (!this.addForm.valid) {
      markAllAsDirty(this.addForm);
      return;
    }
    this.addForm.value['app'] = this._app.name;
    this.messageService.add({key: 'bc', severity:'info', summary: 'Info', detail: 'The data was sended to the server'});
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
        this.messageService.add({key: 'bc', severity: 'success', summary: 'Success', detail: 'The instance was saved correctlly'});
      },
      (err) => {
        this.messageService.add({key: 'bc', severity: 'error', summary: 'Error', detail: 'Error saving the instance'});
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
    this.messageService.add({key: 'bc', severity:'success', summary: 'Success', detail: 'The file was uploaded successfully'});
    const file = this.addForm.get('inputs_file').value;
    const yaml = require('js-yaml');
    let fileReader = new FileReader();
    let yamlContent;
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      yamlContent = fileReader.result;
      this.fileInputsText.emit(yamlContent);
      this.yamlContentText = yamlContent;
      this.yamlContentBackUp = yamlContent;
      try {
        const doc = yaml.load(yamlContent);
        this.fileInputsJSON.emit(doc);
        setTimeout(() => { this.manageStatus('1'); }, 500);
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

  convertYaml(event) {

    const fileContent = event;
    const currentFile = this.addForm.get('inputs_file').value;
    const currentFileName = currentFile.name;
    const file = new File([fileContent], currentFileName, {type: 'text/plain'});
    this.addForm.get('inputs_file').setValue(file)
  }

  /**
   * 
   * @param status 1- original, 2 - modified,3 - modified and saved
   */
  manageStatus(status) {

    this.fileStatus = status;
    if (status === '3') {
      this.messageService.add({key: 'bc', severity:'success', summary: 'Success', detail: 'The file was modified and saved'});
    }
  }

  resetFileContent() {
    this.yamlContentText = this.yamlContentBackUp;
    this.fileInputsText.emit(this.yamlContentBackUp);
    this.convertYaml(this.yamlContentBackUp);
  }
}

export function markAllAsDirty(form: FormGroup) {
  for (const control of Object.keys(form.controls)) {
    form.controls[control].markAsDirty();
  }
}
