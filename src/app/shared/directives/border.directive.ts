import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnChanges {

  @Input('appBorder') public courseDate!: string;

  constructor(private element: ElementRef) {
  }

  ngOnChanges() {
    const creationDate = new Date(this.courseDate)
    const currentDate = new Date()
    const lastFortnight = new Date(currentDate.getTime() - 14 * 24 * 3600000)

    if (creationDate < currentDate && creationDate >= lastFortnight) {
      this.element.nativeElement.style.boxShadow = '0 1px 2px 0 rgba(10, 190, 0, 0.3), 0 2px 10px 0 rgba(10, 190, 0, 0.5)'
    } else if (creationDate > currentDate) {
      this.element.nativeElement.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 255, 0.3), 0 2px 10px 0 rgba(0, 0, 255, 0.5)'
    }

  }
}
