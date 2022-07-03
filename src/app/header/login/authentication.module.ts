import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationComponent} from "./authentication/authentication.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: 'login', component: AuthenticationComponent},
]

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [AuthenticationComponent]
})
export class AuthenticationModule { }


