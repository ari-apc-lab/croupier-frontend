import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {  }

  onLogin(): void {
    this.authService.login({
      // redirectUri: window.location.href
    });
  }

  onLogout(): void {
    this.authService.logout(window.location.origin);
  }

  onRegister(): void {
    this.authService.register();
  }

}
