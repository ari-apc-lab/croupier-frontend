import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AppInstanceService } from '../../instances/app-instance.service';
import { requiredFileType } from '../../../utils/file-upload/update-file-validators';
import { AppInstance } from '../../instances/app-instance';

@Component({
  selector: 'app-appdetail',
  templateUrl: './appdetail.component.html',
  styleUrls: ['./appdetail.component.css'],
  providers: [MessageService, PrimeNGConfig]
})
export class AppdetailComponent implements OnInit {

  application: Application;
  inputs: any;
  displayForm: boolean;
  appParamsForm: FormGroup;
  formBuilder: FormBuilder;
  items: MenuItem[];
  activeItem: MenuItem;
  instances: any;
  boolOpts = [
    {label: 'False', value: false},
    {label: 'True', value: true}
  ];

  instanceForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    inputs_file: new FormControl(null, [Validators.required, requiredFileType('yaml')]),
    app: new FormControl(null)
  });

  yamlContentText: any;
  fileTitle: any;
  displayD = false;
  jsonParsedToYaml: string;
  reloadInsList: boolean;
  inputsFromFile;

  // helpers
  isString(val): boolean {return typeof val === 'string'; }
  isNumber(val): boolean {return typeof val === 'number'; }
  isObject(val): boolean {return typeof val === 'object'; }
  isBoolean(val): boolean {return typeof val === 'boolean'; }

  constructor(
    private route: ActivatedRoute,
    private appService: ApplicationService,
    private location: Location,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private instaceService: AppInstanceService

  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getApp();

    this.items = [
      {label: 'Basic configuration'},
      {label: 'Expert configuration'},
      {label: 'Upload File'}
  ];
    this.activeItem = this.items[0];
  }

  getApp(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.appService.getApplication(id).subscribe(
      (app) => {
        this.application = app;
        // input from string to json
        this.inputs = JSON.parse(this.application['inputs'])[0];
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * It can't update because method PUT is disabled, So is needed to create a yaml file and send it.
   */
  save(event): void {

    // import yaml converter
    const yaml = require('yaml');
    Object.keys(this.inputsFromFile).forEach(key => {
      this.inputs.forEach(element => {
        if (key === element['name']) {
          this.inputsFromFile[key] = element.default;
        }
      });
    });

    // create yaml instance
    const content = new yaml.Document();
    // set input values to yaml's value. (content)
    content.contents = this.inputsFromFile;
    // constanto to host yaml content in string.
    const contentToFile = content.toString();
    // create new file with the yaml value in string.
    const file = new File([contentToFile], 'inputs.yaml', {type: ''});
    // set app name to the form of instance.
    this.instanceForm.get('app').setValue(this.application.name);
    this.instanceForm.get('inputs_file').setValue(file);

    // send form to the instance service to store it in DB.
    this.instaceService.addAppInstance(this.instanceForm.value)
    .pipe(

    )
    .subscribe(
      (data) => {
        if (this.reloadInsList) {
          this.reloadInsList = false;
        } else {
          this.reloadInsList = true;
        }
        this.messageService.add({key: 'bc', severity: 'success', summary: 'Success', detail: 'The instance was saved correctlly'});
      },
      (err) => {
        this.messageService.add({key: 'bc', severity: 'error', summary: 'Error', detail: 'Error saving the instance'});
      }
    );
    // this.appService.updateApplication(this.application).subscribe(() => this.goBack());
  }

  addField(event, key, value) {
    event[key.value] = value.value;
    key.value = '';
    value.value = '';
  }

  /**
   * TODO set the values in the form (basic and expert configuration).
   * @param event inputs from the .yaml file in JSON format, received from InstanceFormComponent.
   */
  receiveImputsJSON(event) {
    this.inputsFromFile = event;
    Object.keys(event).forEach(key => {
      this.inputs.forEach(element => {
        if (key === element['name']) {
          element.default = event[key];
        }
      });
    });
  }

  receiveImputsText(event) {
    this.yamlContentText = event;
  }

 /**
  * Open the editor to edit the paratmeters value in YAML format.
  */
  openParameterEditor(inputName, valueJson) {
    this.displayD = inputName;
    const YAML = require('yaml');
    // Get document, or throw exception on error
    const doc = new YAML.Document();
    doc.contents = valueJson;
    this.jsonParsedToYaml = doc.toString();
  }

  /**
   * Get the inputs value from the text editor. pass the string data to json, then print in the screen.
   * @param input string of new values.
   * @returns parsed input values
   */
  receiveEditorValue(input){
    const yaml = require('js-yaml');
    const parsedJSON = yaml.load(input);
    this.messageService.add({key: 'bc', severity: 'success', summary: 'Success', detail: 'Input data modified correctly'});
    return parsedJSON;
  }

}
