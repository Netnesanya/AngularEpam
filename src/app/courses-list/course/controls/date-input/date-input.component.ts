import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements OnInit {

  @Output() public courseDateChange = new EventEmitter<string>()
  @Input() public courseDate: string

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(value: string) {
    this.courseDateChange.emit(value)
  }
}
