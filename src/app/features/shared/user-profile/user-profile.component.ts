import { Component, OnInit } from '@angular/core';
import { AuthService } from '../keycloak-auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profile;
  sideBarOpen = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.profile = this.authService.getProfile();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
