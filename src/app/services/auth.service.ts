import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router) {
  }

  private loginPage: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private userEmail: BehaviorSubject<string> = new BehaviorSubject(null)
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false)

  login(email: string, password: string) {
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

  logout() {
    if (this.isAuthenticated.getValue() && this.userEmail.getValue())

    console.log('Logout', localStorage.getItem('email'))

    localStorage.removeItem('email')
    localStorage.removeItem('password')

    this.userEmail.next(null)
    this.isAuthenticated.next(false)

  }

  getPageStatus() {
    return this.loginPage.asObservable()
  }

  updatePageStatus(value: boolean) {
    this.loginPage.next(value)
  }

  isAuthenticatedCheck() {
    console.log('authService', !!localStorage.getItem('email'));
    return this.isAuthenticated.asObservable()
  }

  logEmail() {
    console.log(localStorage.getItem('email'))
    return this.userEmail.asObservable()
  }
}
