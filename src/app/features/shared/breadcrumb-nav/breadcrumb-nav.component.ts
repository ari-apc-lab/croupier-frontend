import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb-nav',
  templateUrl: './breadcrumb-nav.component.html',
  styleUrls: ['./breadcrumb-nav.component.css']
})
export class BreadcrumbNavComponent implements OnInit {

  constructor(private router: Router) { }
  items: MenuItem[];
  ngOnInit(): void {
    console.log(this.router.url);
    this.items = [
      {label: 'Home', url: '/'}
  ];
  }

}
