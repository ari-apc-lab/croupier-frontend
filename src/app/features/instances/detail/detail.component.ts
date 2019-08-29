import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppInstance } from '../app-instance';

import { AppInstanceService } from '../app-instance.service';

@Component({
  selector: 'app-instance-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class InstanceDetailComponent implements OnInit {
  instance: AppInstance;

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
      .subscribe(instance => (this.instance = instance));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.instanceService
      .updateAppInstance(this.instance)
      .subscribe(() => this.goBack());
  }
}
