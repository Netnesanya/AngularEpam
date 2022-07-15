import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Author, Course} from "../../shared/models/course.model";
import {CourseListService} from "../../shared/services/course-list.service";
import {Subscription} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {

  private routerSub$: Subscription;
  private courseFormSub$: Subscription;
  private currentCourse: Course;

  public courseLength: number;
  public courseDate: string;
  public courseDescription: string;
  public courseName: string
  public courseAuthors: Author;
  public courseTopRated: boolean;
  public currentId: number;

  constructor(private router: Router,
              private courseListService: CourseListService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.routerSub$ = this.route.paramMap.subscribe(params => {
      this.currentId = Number(params.get('id'))
      if (params.get('id')) {
        this.loadCourse()
      }
    })

  }

  ngOnDestroy() {
    this.courseFormSub$.unsubscribe()
    this.routerSub$.unsubscribe()
  }

  loadCourse(): void {
    this.spinner.show()
    this.courseFormSub$ = this.courseListService.getCourseById(this.currentId)
      .subscribe(course => {
        this.currentCourse = course;

        this.courseDate = this.currentCourse.date;
        this.courseName = this.currentCourse.name;
        this.courseLength = this.currentCourse.length;
        this.courseDescription = this.currentCourse.description;
        this.courseTopRated = this.currentCourse.isTopRated;
        this.courseAuthors = this.currentCourse.authors

      },
        error => {
        console.log(error);
        this.router.navigate(['404'])
        },
        () => this.spinner.hide())
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

  onCancelClick(): void {
    this.router.navigate(['/courses'])
  }

  onSaveClick(): void {
    if (this.currentId) {
      this.courseFormSub$ = this.courseListService.updateCourse(this.currentId, this.createCourse())
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
