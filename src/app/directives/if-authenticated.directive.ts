import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appIfAuthenticated]'
})
export class IfAuthenticatedDirective {

  @Input('appIfAuthenticated') set isAuthenticated(status: boolean) {
    if (status) {
      this.viewContainer.createEmbeddedView(this.templateRef)

    } else if (!status) {
      this.viewContainer.clear()

    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }


}
