import { Component, Input } from '@angular/core';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {
  @Input() job: Job = {} as Job;
}
