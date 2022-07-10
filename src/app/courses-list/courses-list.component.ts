import {Component, Input, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {CourseListService} from "../shared/services/course-list.service";

import {Course} from "../shared/models/course.model";
import {FilterPipe} from "../shared/pipes/filter.pipe";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {


  public searchQuery: string = ''
  courseList: Course[];


  handleDelete = (id: number): void =>  {
    this.courseListService.removeCourse(id)
    this.courseList = this.courseListService.getList()
  }

  constructor(public courseListService: CourseListService,
              public router: Router,
              public filterPipe: FilterPipe) {
  }

  ngOnInit(): void {
    this.courseList = this.courseListService.getList()
  }

  handleSearch(): void {
    this.courseList = this.filterPipe.transform(this.courseList, this.searchQuery)
    this.searchQuery = ''
  }

  handleLoadMore(): void {
    console.log("there's nothing to load")
  }

  trackById(index: number, course: Course): number {
    return course.id
  }


  handleRedefine(): void{
    this.courseList = this.courseListService.handleRedefine()
  }

  onAddCourseClick(): void {
    this.router.navigate(['/courses/new'])
  }

}
