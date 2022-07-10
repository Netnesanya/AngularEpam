import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loginPage: boolean = false;
  userEmail: string;


  onLogoutClick(): void {
    this.authService.logout()
  }

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getPageStatus()
      .subscribe(pageStatus => this.loginPage = pageStatus)

    this.authService.logEmail()
      .subscribe(email => this.userEmail = email)
  }

  ngOnDestroy(): void {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }
}
