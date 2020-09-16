import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  userMessage: string;

  constructor() {
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.userName = localStorage.getItem('username');
    this.email = localStorage.getItem('email');



   }

  ngOnInit(): void {
  }

}
