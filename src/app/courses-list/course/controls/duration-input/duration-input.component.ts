import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss']
})
export class DurationInputComponent implements OnInit {

  @Output() public courseDurationChange = new EventEmitter<number>()
  @Input() public courseDuration: number

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(value: number) {
    this.courseDurationChange.emit(value)
  }

}
