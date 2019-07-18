import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public authService: AuthService) {}

  onLogin(): void {
    this.authService.login({
      redirectUri: window.location.href
    });
  }

  onLogout(): void {
    this.authService.logout(window.location.origin);
  }

  onRegister(): void {
    this.authService.register();
  }

  getToken(): string {
    let tok: string;
    this.authService.getToken().then(token => (tok = token));
    return tok;
  }
}
