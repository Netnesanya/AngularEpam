import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseListService} from "../services/course-list.service";
import {Course} from "../models/course.model";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public currentCourse: Course;
  private currentId: number;

  constructor(private route: ActivatedRoute,
              private courseListService: CourseListService) { }

  ngOnInit(): void {
    this.currentId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.findCourseTitle(this.currentId);

  }

  findCourseTitle(id: number) {
    if (!this.currentId) return
    this.courseListService.getCourseById(id)
      .subscribe(course => this.currentCourse = course)
  }


}
