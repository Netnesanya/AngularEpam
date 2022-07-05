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

  public currentCourseName: string;
  private currentCourse: Course;
  private currentId: number;

  constructor(private route: ActivatedRoute,
              private courseList: CourseListService) { }

  ngOnInit(): void {
    this.currentId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.findCourseTitle(this.currentId)
    console.log(this.currentId);

  }

  findCourseTitle(id: number) {
    if (!this.currentId) return
    this.currentCourse = this.courseList.courseList.find(el => el.id === id)
    this.currentCourseName = this.currentCourse.title
  }

}
