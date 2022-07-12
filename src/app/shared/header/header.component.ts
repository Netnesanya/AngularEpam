import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loginPage: boolean = false;
  userEmail: string;


  constructor(public authService: AuthService,
              private router: Router) {
  }

  onLogoutClick(): void {
    const confirmation = confirm('Are you sure you want to leave?')
    if (!!confirmation) {
      this.authService.logout()
      this.router.navigate(['/login'])
    }

  }

  ngOnInit(): void {
    this.authService.getPageStatus()
      .subscribe(pageStatus => this.loginPage = pageStatus)

    // this.authService.logEmail()
    //   .subscribe(email => this.userEmail = email)
  }

  ngOnDestroy(): void {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }
}
