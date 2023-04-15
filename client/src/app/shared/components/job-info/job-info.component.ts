import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/account/jobs/jobs.service';
import { Job } from '../../models/job';
import { UserJobInterest } from '../../models/user-job-interest';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {
  @Input() myJobs: UserJobInterest[] = [];
  @Input() job: Job = {} as Job;

  constructor(private jobService: JobsService, private toastr: ToastrService) {}

  clickFollow() {
    this.jobService.follow(this.job.id).subscribe({
      next: () => {
        this.toastr.success('Job followed successfully');
        const item: UserJobInterest = {
          job: this.job,
          jobId: this.job.id,
          userId: 0,
        }
        this.myJobs.push(item);
      },
    })
  }

  clickUnfollow() {
    this.jobService.unfollow(this.job.id).subscribe({
      next: () => {
        this.toastr.success('Job removed from your interests');
        this.myJobs = this.myJobs.filter(x => x.jobId !== this.job.id);
      }
    })
  }

  isFollowed(): boolean {
    let key = false;
    this.myJobs.forEach(x => {
      if (x.jobId === this.job.id) {
        key = true;
      }
    })
    return key;
  }

}