import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  email: string;
  password: string;

  constructor(public authService: AuthService) { }





  ngOnInit(): void {
    this.authService.updatePageStatus(true)
  }

  ngOnDestroy(): void {
    this.authService.updatePageStatus(false)
  }

  onLoginClick(): void {
    this.authService.login(this.email, this.password)
    this.email = this.password = null
  }

  onAuthCheck(): void {
    this.authService.isAuthenticatedCheck()

  }

  onLogEmail(): void {
    this.authService.getUser()
      .subscribe(user => console.log(user));
  }

}
