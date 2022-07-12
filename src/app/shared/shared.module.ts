import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IfAuthenticatedDirective} from "./directives/if-authenticated.directive";
import {DurationPipe} from "./pipes/duration.pipe";
import {OrderByPipe} from "./pipes/order-by.pipe";
import {FilterPipe} from "./pipes/filter.pipe";
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {BorderDirective} from "./directives/border.directive";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthenticationInterceptor} from "../authentication/authentication/authentication.interceptor";




@NgModule({
  declarations: [
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    BorderDirective,
    IfAuthenticatedDirective,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    BorderDirective,
    IfAuthenticatedDirective,
    FilterPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
