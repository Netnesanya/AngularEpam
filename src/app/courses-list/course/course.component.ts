import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../../models/course.model";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseComponent implements OnInit {

  @Input() course: Course;

  @Output() onDeleteClick = new EventEmitter<number>()

  constructor(public router: Router) {}

  ngOnInit(): void {  }

  onEditClick(id: number) {
    this.router.navigate([`courses/${id}`])
  }

  handleDelete(id:number): void {
    this.onDeleteClick.emit(id)
  }

}
