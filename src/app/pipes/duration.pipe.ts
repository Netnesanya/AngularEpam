import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    const hours = this.getHours(value)
    const minutes = this.getMinutes(value)

    if(!value) return ''

    if (hours) {
      return hours + minutes
    } else
      return minutes + 'min'
  }

  getHours(value: number) {
    if (!Math.floor(value / 60)) {
      return 0 + 'h '
    }
    return Math.floor(value / 60) + 'h '
  }

  getMinutes(value: number) {
    if (!(value % 60)) {
      return 0 + 'min'
    }
    return value % 60 + 'min'
  }
}
