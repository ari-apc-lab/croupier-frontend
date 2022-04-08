import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hid-portal-fe';
  displayCookies: boolean;

  ngOnInit() {
    this.checkCookies();
  }

  checkCookies() {
    if (localStorage.getItem('cookies-acceptance')) {
      this.displayCookies = false;
    } else {
      this.displayCookies = true;
    }
  }

  public onCloseCookies(open: any):void {
    this.displayCookies = false;
  }
}

