import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { MessageService, PrimeNGConfig } from 'primeng/api';

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
  appParamsForm: FormGroup; //new FormGroup({});
  formBuilder: FormBuilder;

  items: MenuItem[];

  activeItem: MenuItem;
  instances: any;
  boolOpts = [
    {label: 'False', value: false},
    {label: 'True', value: true}
  ];

  yamlContentText: any;
  fileTitle: any;
  displayD = false;
  jsonParsedToYaml: string;

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
    private primengConfig: PrimeNGConfig

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

  save(): void {
    this.appService.updateApplication(this.application).subscribe(() => this.goBack());
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
