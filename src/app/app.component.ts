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
    console.log('cookies acepatdas? ', localStorage.getItem('cookies-acceptance'))
    if (localStorage.getItem('cookies-acceptance')) {
      console.log('las ookies han sido aceptadas XD')
      this.displayCookies = false;
    } else {
      this.displayCookies = true;
    }
  }

  public onCloseCookies(open: any):void {
    this.displayCookies = false;
  }
}

