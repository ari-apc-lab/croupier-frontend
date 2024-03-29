import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../keycloak-auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: string;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() displaySBButton = true;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

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

  navigate(url) {
    this.router.navigate([url])
  }

}
