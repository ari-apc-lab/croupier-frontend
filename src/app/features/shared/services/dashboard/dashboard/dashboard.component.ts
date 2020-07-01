import { Component, OnInit } from '@angular/core';

import { Application } from '../../applications/application';
import { ApplicationService } from '../../applications/application.service';

@Component({
  selector: 'application-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.applicationService
      .getApplications()
      .subscribe(applications => (this.applications = applications.slice(0, 3)));
  }

}
