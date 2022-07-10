import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[appIfAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit {


  private authStatus: boolean;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isAuthenticatedCheck()
      .subscribe((status) => this.isAuthenticated(status))
    console.log('directive', this.authStatus)
  }

  private isAuthenticated(status: boolean) {
    if (!status) {
      this.viewContainer.createEmbeddedView(this.templateRef)

    } else if (status) {
      this.viewContainer.clear()

    }
  }

}
