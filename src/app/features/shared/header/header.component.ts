import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../keycloak-auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: string;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onLogin(): void {
    this.authService.login({
      redirectUri: window.location.href
    });
  }

  onLogout(): void {
    this.authService.logout(window.location.origin).then(() => localStorage.clear());
  }

  onRegister(): void {
    this.authService.register();
  }

}
