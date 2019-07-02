import { Component, OnInit } from '@angular/core';
import { Application } from '../application';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.applicationService
      .getApplications()
      .subscribe(applications => (this.applications = applications.slice(1, 5)));
  }
}
