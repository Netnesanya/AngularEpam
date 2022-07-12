import { Pipe, PipeTransform } from '@angular/core';
import {Course} from "../models/course.model";

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Course[]): Course[] {
    const courses = [...value]

    return courses.sort((prev, next) =>  {
      return  +next.date - +prev.date
    })
  }

}
