import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnChanges {

  constructor() {
  }

  public courseDuration: number;
  public courseDate: string
  public courseDescription: string;
  public courseTitle: string
  public courseAuthors: string;

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit(): void {
  }

  onDurationChange(value: number) {
    this.courseDuration = value
  }

  onDateChange(value: string) {
    this.courseDate = value
  }

  onCancelClick() {

  }

  onSaveClick() {

  }
  onClick() {

  }
}
