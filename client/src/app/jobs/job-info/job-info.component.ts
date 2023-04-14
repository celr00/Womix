import { Component, Input, OnInit, Self } from '@angular/core';
import { Job, User } from 'src/app/shared/models/job';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {
  @Input() job: Job = {} as Job;

}
