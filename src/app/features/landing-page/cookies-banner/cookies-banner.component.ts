import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cookies-banner',
  templateUrl: './cookies-banner.component.html',
  styleUrls: ['./cookies-banner.component.css']
})
export class CookiesBannerComponent implements OnInit {

  @Output() closeCookies = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  acceptCookies() {
    console.log(document.cookie);
    localStorage.setItem('cookies-acceptance', 'true');
    this.closeCookies.emit(false)
  }

  // notas:
  /**
   * 5 - cerrar el baner.
   * 6 - se pueden rechazar?
   */

}
