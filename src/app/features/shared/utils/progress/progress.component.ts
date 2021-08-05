import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-util-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  @Input() progress = 0;

}
