import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-appdetail',
  templateUrl: './appdetail.component.html',
  styleUrls: ['./appdetail.component.css']
})
export class AppdetailComponent implements OnInit {

  application: Application;

  constructor(
    private route: ActivatedRoute,
    private appService: ApplicationService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getApp();
  }

  getApp(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.appService.getApplication(id).subscribe(app => (this.application = app));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.appService.updateApplication(this.application).subscribe(() => this.goBack());
  }

}
