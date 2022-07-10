import { Pipe, PipeTransform } from '@angular/core';
import {Course} from "../models/course.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(courses: Course[], query: string = ''): Course[] {

    if (!query.trim()) return courses

    return courses.filter(course => course.title.toLowerCase().trim().includes(query.toLowerCase().trim()))
  }


}
