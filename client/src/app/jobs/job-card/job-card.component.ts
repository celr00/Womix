import { Component, Input } from '@angular/core';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  @Input() job: Job = {} as Job;
  @Input() show = true;
  @Input() isActive = false;
}
