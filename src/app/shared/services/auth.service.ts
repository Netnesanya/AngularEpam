import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Authentication, AuthResponse, User} from "../models/authentication.model";
import {NgxSpinnerService} from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router,
              private httpClient: HttpClient,
              private spinner: NgxSpinnerService) {
  }

  private loginPage: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private userToken: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('token'))
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth())

  login(login: string, password: string): void {
    if (!login || !password) return

    this.handleLogin({login, password})

    this.isAuthenticated.next(true)

    if (this.isAuthenticated.getValue()) {
      this.router.navigate(['/'])
    }
  }

  logout(): void {
    if (this.isAuthenticated.getValue()) {
        localStorage.setItem('token', '')
        this.isAuthenticated.next(false)
    }
  }

  handleLogin(userData: Authentication): void {
    this.spinner.show()
     this.httpClient.post<AuthResponse>(`${environment.URL}auth/login`, userData)
      .subscribe(response => {
        this.setToken(response);
        this.spinner.hide()
      })
  }

  setToken(response: AuthResponse) {
    if (response) {
      localStorage.setItem('token', response.token)
      this.isAuthenticated.next(true)
      this.router.navigate(['courses'])
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getPageStatus(): Observable<boolean> {
    return this.loginPage.asObservable()
  }

  updatePageStatus(value: boolean): void {
    this.loginPage.next(value)
  }

  isAuthenticatedCheck(): Observable<boolean> {
    return this.isAuthenticated.asObservable()
  }

  getUser(): Observable<User> {
    const token = this.getToken()
    return this.httpClient.post<User>(`${environment.URL}auth/userinfo`, {token})
  }

  isAuth() {
    return !!localStorage.getItem('token')
  }
}
