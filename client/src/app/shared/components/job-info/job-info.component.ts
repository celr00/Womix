import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/account/jobs/jobs.service';
import { Job } from '../../models/job';
import { UserJobInterest } from '../../models/user-job-interest';
import { AccountService } from 'src/app/landing/account.service';
import { Account } from '../../models/account';
import { map } from 'rxjs';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {
  @Input() myJobs: UserJobInterest[] = [];
  @Input() job: Job = {} as Job;
  @Input() loggedIn = false;

  constructor(private jobService: JobsService, private toastr: ToastrService) {

    }

  clickFollow() {
    this.jobService.follow(this.job.id).subscribe({
      next: () => {
        this.toastr.success('Se mostró tu interés en el trabajo');
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
        this.toastr.success('El trabajo fue eliminado de tus intereses');
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
