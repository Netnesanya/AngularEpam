import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router) {
  }

  private loginPage: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private userEmail: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('email'))
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth())

  login(email: string, password: string): void {
    if (!email || !password) return

    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    console.log('logged in successfully')

    this.userEmail.next(email)
    this.isAuthenticated.next(true)

    if (this.isAuthenticated.getValue()) {
      this.router.navigate(['/'])
    }
  }

  logout(): void {
    if (this.isAuthenticated.getValue() && this.userEmail.getValue()) {
      console.log('Logout', localStorage.getItem('email'))

      localStorage.removeItem('email')
      localStorage.removeItem('password')

      this.userEmail.next(null)
      this.isAuthenticated.next(false)
    }
  }

  getPageStatus(): Observable<boolean> {
    return this.loginPage.asObservable()
  }

  updatePageStatus(value: boolean): void {
    this.loginPage.next(value)
  }

  isAuthenticatedCheck(): Observable<boolean> {
    console.log('authService', !!localStorage.getItem('email'));
    return this.isAuthenticated.asObservable()
  }

  logEmail(): Observable<string> {
    console.log(localStorage.getItem('email'))
    return this.userEmail.asObservable()
  }

  isAuth() {
    return !!localStorage.getItem('email')
  }
}
