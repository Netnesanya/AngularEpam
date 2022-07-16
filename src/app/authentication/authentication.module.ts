import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationComponent} from "./authentication/authentication.component";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {NgxSpinnerService} from "ngx-spinner";



const routes: Routes = [
  {path: 'login', component: AuthenticationComponent}
]

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule
  ],
  exports: [AuthenticationComponent],
  providers: [NgxSpinnerService]
})
export class AuthenticationModule { }


