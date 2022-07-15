import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Author, Course} from "../../shared/models/course.model";
import {CourseListService} from "../../shared/services/course-list.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {

  private courseFormSub$: Subscription;
  private currentCourse: Course;


  public courseLength: number;
  public courseDate: string;
  public courseDescription: string;
  public courseName: string
  public courseAuthors: Author;
  public courseTopRated: boolean;
  public currentId: number;

  constructor(public router: Router,
              public courseListService: CourseListService,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentId = Number(this.route.snapshot.paramMap.get('id'))

    if (isNaN(this.currentId) || !this.courseListService.getCourseById(this.currentId) && this.currentId) {
      this.router.navigate(['404'])

    } else if (this.currentId) {

      this.courseFormSub$ = this.courseListService.getCourseById(this.currentId)
        .subscribe(course => {

          this.currentCourse = course;
          this.courseDate = this.currentCourse.date;
          this.courseName = this.currentCourse.name;
          this.courseLength = this.currentCourse.length;
          this.courseDescription = this.currentCourse.description;
          this.courseTopRated = this.currentCourse.isTopRated;
          this.courseAuthors = this.currentCourse.authors

        })
    }
  }

  ngOnDestroy() {
    this.courseFormSub$.unsubscribe()
  }

  onDurationChange(value: number): void {
    this.courseLength = value
  }

  onDateChange(value: string): void {
    this.courseDate = value
  }

  createCourse(): Course {
    return this.currentCourse = {
      name: this.courseName,
      length: this.courseLength,
      date: this.courseDate,
      id: this.currentId,
      description: this.courseDescription,
      authors: {
        id: 123,
        name: 'author'
      },
      isTopRated: (5 < (Math.random() * 10))
    }
  }

  editCourse(): Course {
    return this.currentCourse = {
      id: this.currentId,
      name: this.courseName,
      description: this.courseDescription,
      length: this.courseLength,
      date: this.courseDate,
      authors: {
        id: 123,
        name: 'author'
      },
      isTopRated: (5 < (Math.random() * 10))
    }
  }

  onCancelClick(): void {
    this.router.navigate(['/courses'])
  }

  onSaveClick(): void {
    if (this.currentId) {
      this.courseFormSub$ = this.courseListService.updateCourse(this.currentId, this.editCourse())
        .subscribe(response => console.log(response))
      this.courseListService.getList()
      this.router.navigate(['/courses'])
    } else {
      this.courseFormSub$ = this.courseListService.createCourse(this.createCourse())
        .subscribe(response => console.log(response))
      this.courseListService.getList()
      this.router.navigate(['/courses'])
    }
  }
}
