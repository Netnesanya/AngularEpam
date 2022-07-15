import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CoursesListComponent} from "./courses-list.component";
import {CourseComponent} from "./course/course.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AuthGuard} from "../shared/guards/auth.guard";
import {CourseFormComponent} from "./course-form/course-form.component";
import {FilterPipe} from "../shared/pipes/filter.pipe";
import {ControlsComponent} from "./course/controls/controls.component";
import {DateInputComponent} from "./course/controls/date-input/date-input.component";
import {DurationInputComponent} from "./course/controls/duration-input/duration-input.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CoursesListComponent
  },
  {
    path: 'new',
    canActivate: [AuthGuard],
    component: CourseFormComponent
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: CourseFormComponent
  }
]

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseComponent,
    CourseFormComponent,
    ControlsComponent,
    DateInputComponent,
    DurationInputComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
  ]

})
export class CoursesModule { }
