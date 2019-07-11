import { Component, OnInit } from '@angular/core';
import { Application } from '../application';

import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class AppListComponent implements OnInit {
  applications: Application[];

  constructor(private appService: ApplicationService) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.appService.getApplications().subscribe(apps => (this.applications = apps));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.appService.addApplication({ name } as Application).subscribe(app => {
      this.applications.push(app);
    });
  }

  delete(app: Application): void {
    this.applications = this.applications.filter(a => a !== app);
    this.appService.deleteApplication(app).subscribe();
  }
}
