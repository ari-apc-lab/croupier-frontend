import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';

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
        console.log('instance inputs: ', this.inputs);
      });
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
    console.log('id ins:', this.instance.id);
    this.messageService.add({severity: 'info', summary: 'Executing:', detail: 'The instance is executing, please wait!'});
    this.instanceService.executeInstance(this.instance.id).subscribe(
      (data) => {
        console.log('resultado de la ejecución: ', data);
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
   // const testJSON = {nombre: "perro sanxe", edad: "milenario", delito: {dia:"1-2-3", nombre: "tekito tuvoto"}};
    const YAML = require('yaml');
    // Get document, or throw exception on error
    const doc = new YAML.Document();
    doc.contents = json;
    return doc.toString();

  }

}
