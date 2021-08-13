import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppInstance } from '../app-instance';
import { AppInstanceService } from '../app-instance.service';

@Component({
  selector: 'app-instancedetail',
  templateUrl: './instancedetail.component.html',
  styleUrls: ['./instancedetail.component.css']
})
export class InstancedetailComponent implements OnInit {

  instance: AppInstance;
  inputs: any;

  // hepers
  isString(val): boolean {return typeof val === 'string';}
  isNumber(val): boolean {return typeof val === 'number';}
  isObject(val): boolean {return typeof val === 'object';}
  isBoolean(val): boolean {return typeof val === 'boolean';}

  constructor(
    private route: ActivatedRoute,
    private instanceService: AppInstanceService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getApp();
  }

  getApp(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.instanceService
      .getAppInstance(id)
      .subscribe(instance => {
        this.instance = instance
        
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
    this.instanceService.executeInstance(this.instance.id).subscribe(
      (data) => {
        console.log('resultado de la ejecución: ', data);
      }
    )
  }

}
