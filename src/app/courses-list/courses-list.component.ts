import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {CourseListService} from "../shared/services/course-list.service";

import {Course} from "../shared/models/course.model";
import {FilterPipe} from "../shared/pipes/filter.pipe";
import {Subscription} from "rxjs";
import {query} from "@angular/animations";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {


  public searchQuery: string = '';
  public courseList: Course[];
  public portion: number = 0;

  private courseSub: Subscription;



  handleDelete = (id: number): void =>  {
    const confirmDelete = confirm('Do you really want to delete this course? Yes/No')
    if (confirmDelete) {
      this.courseSub = this.courseListService.removeCourse(id)
        .subscribe(response => console.log(response))
      this.updateList()
    }
  }

  constructor(public courseListService: CourseListService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.updateList()
  }

  ngOnDestroy() {
    this.courseSub.unsubscribe()
  }

  handleSearch(): void {
    this.courseSub = this.courseListService.getList(this.portion, this.searchQuery, 30)
      .subscribe(list => this.courseList = list)
    this.searchQuery = ''
  }

  handleLoadMore(event: Event): void {
    event.preventDefault()
    this.courseSub = this.courseListService.getList(++this.portion)
      .subscribe(list => {
        this.courseList = [...this.courseList, ...list]
      })
  }

  trackById(index: number, course: Course): number {
    return course.id
  }

  updateList(): void {
    this.courseSub = this.courseListService.getList()
      .subscribe(courseList => this.courseList = courseList)
  }


  onAddCourseClick(): void {
    this.router.navigate(['/courses/new'])
  }

  handlePrev(): void {
    if (this.portion === 0) return
    this.courseSub = this.courseListService.getList(--this.portion)
      .subscribe(list => {
        this.courseList = list
      })
  }

  handleNext(): void {
    this.courseSub = this.courseListService.getList(++this.portion)
      .subscribe(list => {
        this.courseList = list
      })
  }
}
