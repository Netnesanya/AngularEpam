import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {CourseComponent} from './courses-list/course/course.component';
import {CourseFormComponent} from './courses-list/add-course/course-form.component';
import {ControlsComponent} from './courses-list/course/controls/controls.component';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {DateInputComponent} from './courses-list/course/controls/date-input/date-input.component';
import {DurationInputComponent} from './courses-list/course/controls/duration-input/duration-input.component';
import {IfAuthenticatedDirective} from './directives/if-authenticated.directive';
import {BorderDirective} from "./directives/border.directive";
import {DurationPipe} from "./pipes/duration.pipe";
import {OrderByPipe} from "./pipes/order-by.pipe";
import {FilterPipe} from "./pipes/filter.pipe";
import {AuthenticationModule} from "./header/login/authentication.module";
import {Error404Component} from "./error404/error404.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'courses',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CoursesListComponent,
      },
      {
        path: 'new',
        component: CourseFormComponent,
      },
      {
        path: ':id',
        component: CourseFormComponent,
      },
    ],
  },
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  {path: '**', component: Error404Component},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    CoursesListComponent,
    CourseComponent,
    CourseFormComponent,
    ControlsComponent,
    BorderDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    DateInputComponent,
    DurationInputComponent,
    IfAuthenticatedDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AuthenticationModule

  ],
  exports: [RouterModule],
  providers: [FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}

