import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationComponent} from "./authentication/authentication.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {CoursesListComponent} from "../../courses-list/courses-list.component";
import {AddCourseComponent} from "../../courses-list/add-course/add-course.component";

const routes: Routes = [
  {path: 'courses', component: CoursesListComponent},
  // {path: 'login', component: AuthenticationComponent},
  {path: 'edit', component: AddCourseComponent},
  {path: '', redirectTo: 'courses', pathMatch: 'full'}
  // {path: '**', redirectTo: 'courses'}
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


