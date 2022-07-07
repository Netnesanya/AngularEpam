import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseListService} from "../../services/course-list.service";
import {Course} from "../../models/course.model";


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  public currentCourse: Course;
  public courseDuration: number;
  public courseDate: Date
  public courseDescription: string;
  public courseTitle: string
  public courseAuthors: string;
  public courseTopRated: boolean;
  public currentId: number;


  constructor(public router: Router,
              public CourseListService: CourseListService,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentId = parseInt(this.route.snapshot.paramMap.get('id'))

    if (!this.CourseListService.getCourseById(this.currentId) && this.currentId) {
      this.router.navigate(['404'])
    }

    if (this.currentId) {
      this.currentCourse = this.CourseListService.getCourseById(this.currentId)
      this.courseEdit()
    }

  }

  courseCreation(): void {
    this.currentCourse = {
      id: 1234123,
      title: this.courseTitle,
      duration: this.courseDuration,
      creationDate: new Date(),
      // creationDate: this.courseDate,
      TopRated: this.courseTopRated,
      description: this.courseDescription,
      authors: this.courseAuthors
    }
  }

  courseEdit(): void {
    this.courseDuration = this.currentCourse.duration
    this.courseDescription = this.currentCourse.description
    this.courseTitle = this.currentCourse.title
    this.courseAuthors = this.currentCourse.authors
    // this.courseDate = this.currentCourse.creationDate
    this.courseDate = new Date()
    this.courseTopRated = this.currentCourse.TopRated
  }


  onDurationChange(value: number): void {
    this.courseDuration = value
  }

  onDateChange(value: Date): void {
    this.courseDate = value
  }

  onCancelClick(): void {
    this.router.navigate(['/courses'])
  }

  onSaveClick(): void {
    if (!this.currentId) {
      this.courseCreation()
      this.CourseListService.createCourse(this.currentCourse)
      this.router.navigate(['/courses'])

    } else if (this.currentId) {
      this.courseCreation()
      this.CourseListService.updateCourse(this.currentId, this.currentCourse)
      this.router.navigate(['/courses'])
    }
  }
}
