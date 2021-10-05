import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Application } from '../application';
import { ApplicationService } from '../application.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MenuItem} from 'primeng/api';
import { AppInstanceService } from '../../instances/app-instance.service';

@Component({
  selector: 'app-appdetail',
  templateUrl: './appdetail.component.html',
  styleUrls: ['./appdetail.component.css']
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

  // helpers
  isString(val): boolean {return typeof val === 'string';}
  isNumber(val): boolean {return typeof val === 'number';}
  isObject(val): boolean {return typeof val === 'object';}
  isBoolean(val): boolean {return typeof val === 'boolean';}
  boolOpts = [
    {label: 'False', value: false},
    {label: 'True', value: true}];
  constructor(
    private route: ActivatedRoute,
    private appService: ApplicationService,
    private location: Location

  ) { }

  ngOnInit(): void {
    
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
    console.log('id', id)
    this.appService.getApplication(id).subscribe(
      (app) => {
        this.application = app;

        // input from string to json
        this.inputs = JSON.parse(this.application['inputs'])[0];
        console.log(this.inputs);

        }
      );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.appService.updateApplication(this.application).subscribe(() => this.goBack());
  }

  testSave() {
    console.log(this.inputs);
  }

  addField(event, key, value) {
    event[key.value] = value.value;
    key.value = ''
    value.value = ''
  }

  stringify(json) {
    console.log(json);
   // const parsed = JSON.stringify(json);
   // return parsed;
  }


}
