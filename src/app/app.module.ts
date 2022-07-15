import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {Error404Component} from "./error404/error404.component";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./shared/guards/auth.guard";
import {AuthenticationModule} from "./authentication/authentication.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes: Routes = [
  {
    path: 'courses',
    canActivate: [AuthGuard],
    loadChildren: () => import('./courses-list/courses.module').then(m => m.CoursesModule)
  },
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  {path: '**', component: Error404Component},
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AuthenticationModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule

  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

