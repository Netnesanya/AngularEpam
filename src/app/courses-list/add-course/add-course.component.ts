import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseListService} from "../../services/course-list.service";
import {Course} from "../../models/course.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  public currentCourse: Course;
  public courseDuration: number;
  public courseDate: Date
  public courseDescription: string;
  public courseTitle: string
  public courseAuthors: string;
  public courseTopRated: boolean;
  public currentId: number;


  constructor(public router: Router,
              public courseList: CourseListService,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentId = parseInt(this.route.snapshot.paramMap.get('id'))
    if (this.currentId) {
      this.findCourse(this.currentId)
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

  findCourse(id: number): void {
    this.currentCourse = this.courseList.courseList.find(el => el.id === id)
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
    console.log('save in')
    if (!this.currentId) {
      this.courseCreation()
      this.courseList.courseList.push(this.currentCourse)
      this.router.navigate(['/courses'])

    } else if (this.currentId) {
      this.courseCreation()
      this.courseList.courseList.filter(el => el.id !== this.currentId)
      this.courseList.courseList.push({...this.currentCourse})
      this.router.navigate(['/courses'])
    }

    console.log('save out')
  }

}
