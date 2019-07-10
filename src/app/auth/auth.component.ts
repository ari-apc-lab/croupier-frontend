import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogged$: Observable<boolean>;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.isLogged$ = this._authService.isLogged$;
  }

  onLogin(): void {
    this._authService.login();
  }

  onLogout(): void {
    this._authService.logout();
  }

  onRegister(): void {
    this._authService.register();
  }
}
