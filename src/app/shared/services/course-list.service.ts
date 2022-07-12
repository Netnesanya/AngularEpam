import {Injectable} from '@angular/core';
import {Course} from "../models/course.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CourseListService {


  constructor(private httpClient: HttpClient) {
  }


  getList(portion: number = 0, query: string = '', coursesCount: number = 3): Observable<Course[]> {

    let params = new HttpParams()

    params = params.append('sort', 'date')
    params = params.append('count', coursesCount)
    params = params.append('start', portion * coursesCount)
    if (query) params = params.append('textFragment', query);

    return this.httpClient.get<Course[]>(environment.URL + 'courses', {params})
  }

  createCourse(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(environment.URL + 'courses', course)
  }

  getCourseById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(environment.URL + `courses/${id}`)
  }


  updateCourse(id: number, course: Course): Observable<Course> {
   return this.httpClient.patch<Course>(environment.URL + `courses/${id}`, course)
  }


  removeCourse(id: number): Observable<Course> {
     return this.httpClient.delete<Course>(environment.URL + `courses/${id}`)
  }

}
