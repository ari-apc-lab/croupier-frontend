import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-instancedetail',
  templateUrl: './instancedetail.component.html',
  styleUrls: ['./instancedetail.component.css'],
  providers: [MessageService, PrimeNGConfig]
})
export class InstancedetailComponent implements OnInit {

  instance: AppInstance;
  inputs: any;
  displayLT = false;

  // hepers
  isString(val): boolean {return typeof val === 'string'; }
  isNumber(val): boolean {return typeof val === 'number'; }
  isObject(val): boolean {return typeof val === 'object'; }
  isBoolean(val): boolean {return typeof val === 'boolean'; }

  constructor(
    private route: ActivatedRoute,
    private instanceService: AppInstanceService,
    private location: Location,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getApp();
  }

  getApp(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.instanceService
      .getAppInstance(id)
      .subscribe(instance => {
        this.instance = instance;
        this.inputs = JSON.parse(instance['inputs'])[0];
        //TODO Check inputs for null values
        this.filterNullValues(this.inputs)
      });
  }

  filterNullValues(inputs){
    for (let i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var value = input.value;
      if (this.isNullOrUndefined(value)) {
        value = "";
      } else if (Array.isArray(value)) {
        // Remove null entries in array
        var newValue = [];
        for (let j = 0; j < value.length; j++) {
          if (!this.isNullOrUndefined(value[j])){
            newValue.push(value[j])
          }
        }
        input.value = newValue;
      }
    }
  }

  isNullOrUndefined = (value): value is null | undefined => {
    return value === null || value === undefined;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.instanceService
      .updateAppInstance(this.instance)
      .subscribe(() => this.goBack());
  }

  execute() {
    this.messageService.add({severity: 'info', summary: 'Executing:', detail: 'The instance is executing, please wait!'});
    this.instanceService.executeInstance(this.instance.id).subscribe(
      (data) => {
        this.messageService.clear();
        this.messageService.add({severity: 'success', summary: 'Success:', detail: 'Instance executed successfully!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      },
      (err) => {
        console.error(err);
        this.messageService.add({severity: 'error', summary: 'Error:', detail: 'The instance has failed to execute!'});
        setTimeout(() => {
          this.messageService.clear();
        }, 5000);
      }
    );
  }

  displayLongText() {
    this.displayLT = true;
  }

  passToYaml(json) {
    const YAML = require('yaml');
    // Get document, or throw exception on error
    const doc = new YAML.Document();
    doc.contents = json;
    return doc.toString();

  }

}
