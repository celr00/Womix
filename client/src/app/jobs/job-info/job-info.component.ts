import { Component, Input, OnInit, Self } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/account/jobs/jobs.service';
import { Job, User } from 'src/app/shared/models/job';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {
  @Input() job: Job = {} as Job;

  constructor(private jobService: JobsService, private toastr: ToastrService) {}

  clickFollow() {
    this.jobService.follow(this.job.id).subscribe({
      next: () => {
        this.toastr.success('Job followed successfully');
      },
      error: () => {
        this.toastr.error('Failed to follow job');
      }
    })
  }

}
