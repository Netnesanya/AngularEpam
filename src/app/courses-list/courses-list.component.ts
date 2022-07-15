import {Component, OnDestroy, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {CourseListService} from "../shared/services/course-list.service";

import {Course} from "../shared/models/course.model";
import {BehaviorSubject, debounceTime, Subscription} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";



@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {


  public searchQuery = new BehaviorSubject<string>('');
  public courseList: Course[];
  public portion: number = 0;

  private courseSub$: Subscription;


  constructor(public courseListService: CourseListService,
              public router: Router,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show()
    this.updateList()
  }

  ngOnDestroy() {
    this.courseSub$.unsubscribe()
  }

  handleDelete(id: number): void {
    const confirmDelete = confirm('Do you really want to delete this course? Yes/No')
    if (confirmDelete) {
      this.spinner.show()
      this.courseSub$ = this.courseListService.removeCourse(id)
        .subscribe(response => console.log(response))
      this.updateList()
    }
  }

  handleSearch(event: any): void {
    this.searchQuery.next(event.target.value)
    if (this.searchQuery.getValue().length >= 3) {
      this.searchQuery
        .pipe(debounceTime(300))
        .subscribe(query => this.updateList(this.portion, query, 30))
    }
  }

  handleLoadMore(event: Event): void {
    event.preventDefault()
    this.spinner.show()
    this.courseSub$ = this.courseListService.getList(++this.portion)
      .subscribe(list => {
        this.courseList = [...this.courseList, ...list]
        this.spinner.hide()
      })
  }

  trackById(index: number, course: Course): number {
    return course.id
  }

  updateList(portion: number = 0, query: string = '', coursesCount: number = 3): void {
    this.spinner.show()
    this.courseSub$ = this.courseListService.getList(portion, query, coursesCount)
      .subscribe(courseList => {
        this.courseList = courseList
        this.spinner.hide()
      })
  }

  onAddCourseClick(): void {
    this.router.navigate(['/courses/new'])
  }

  handlePrev(): void {
    if (this.portion === 0) return
    this.updateList(--this.portion)
  }

  handleNext(): void {
    this.updateList(++this.portion)
  }
}
