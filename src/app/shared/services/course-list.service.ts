import {Injectable} from '@angular/core';
import {Course} from "../models/course.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CourseListService {


  constructor(private httpClient: HttpClient) {
  }

  public courseList: Course[] = [
    {
      id: 111,
      title: 'Video Course 2. Name tag',
      creationDate: new Date(2021, 8, 8),
      duration: 60,
      TopRated: false,
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and\n' +
        '      details about various components of a course description. Course descriptions report information about a\n' +
        '      university or college\'s classes. They\'re published both in course catalogs that outline degree requirements\n' +
        '      and in course schedules that contain descriptions for all courses offered during a particular semester.',
      authors: ''
    },
    {
      id: 222,
      title: 'Video Course 3. Best ed',
      creationDate: new Date(2022, 5, 22),
      duration: 59,
      TopRated: false,
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and\n' +
        '      details about various components of a course description. Course descriptions report information about a\n' +
        '      university or college\'s classes. They\'re published both in course catalogs that outline degree requirements\n' +
        '      and in course schedules that contain descriptions for all courses offered during a particular semester.',
      authors: ''
    },
    {
      id: 333,
      title: 'Video Course 1. Best op',
      creationDate: new Date(2020, 7, 28),
      duration: 88,
      TopRated: true,
      description: 'Learn about where you can find course descriptions, what information they include, how they work, and\n' +
        '      details about various components of a course description. Course descriptions report information about a\n' +
        '      university or college\'s classes. They\'re published both in course catalogs that outline degree requirements\n' +
        '      and in course schedules that contain descriptions for all courses offered during a particular semester.',
      authors: ''
    }
  ]

  getList(): Course[] {
    return this.courseList
  }

  createCourse(course: Course): void {
    this.courseList.push(course)
  }

  getCourseById(id: number): Course {
    return this.getList().find(el => {
      return el.id === id
    })

  }

  updateCourse(id: number, course: Course) {
    this.courseList = this.courseList.filter(el => el.id !== id)
    this.createCourse(course)
  }


  removeCourse(id: number): void {
    const confirmDelete = confirm('Do you really want to delete this course? Yes/No')
    if (confirmDelete) {
      this.courseList = this.courseList.filter(el => {
        return el.id !== id
      })
    } else {
      return
    }

  }

  handleRedefine(): Course[] {
    return [
      {
        id: 111,
        title: 'Video Course 2. Name tag',
        creationDate: new Date(2021, 8, 8),
        duration: 88,
        TopRated: true,
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and\n' +
          '      details about various components of a course description. Course descriptions report information about a\n' +
          '      university or college\'s classes. They\'re published both in course catalogs that outline degree requirements\n' +
          '      and in course schedules that contain descriptions for all courses offered during a particular semester.',
        authors: ''
      },
      {
        id: 222,
        title: 'Video Course 3. Best ed',
        creationDate: new Date(2022, 5, 22),
        duration: 88,
        TopRated: false,
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and\n' +
          '      details about various components of a course description. Course descriptions report information about a\n' +
          '      university or college\'s classes. They\'re published both in course catalogs that outline degree requirements\n' +
          '      and in course schedules that contain descriptions for all courses offered during a particular semester.',
        authors: ''
      },

      {
        id: 333,
        title: 'Video Course 1. Best op',
        creationDate: new Date(2020, 7, 28),
        duration: 88,
        TopRated: true,
        description: 'Learn about where you can find course descriptions, what information they include, how they work, and\n' +
          '      details about various components of a course description. Course descriptions report information about a\n' +
          '      university or college\'s classes. They\'re published both in course catalogs that outline degree requirements\n' +
          '      and in course schedules that contain descriptions for all courses offered during a particular semester.',
        authors: ''
      }
    ]
  }
}
