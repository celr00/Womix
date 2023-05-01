import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/account/jobs/jobs.service';
import { Job } from '../../models/job';
import { AccountService } from 'src/app/landing/account.service';
import { Router } from '@angular/router';
import { Account } from '../../models/account';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent {
  @Input() job: Job = {} as Job
  @Input() isFollowed: boolean = false;
  @Input() disableFollow: boolean = false;
  @Output() send = new EventEmitter<boolean>;
  loggedIn = false;
  accountId?: number
  account: Account | null

  constructor(private jobService: JobsService, private toastr: ToastrService,
    private accountService: AccountService, private router: Router) {
    this.loggedIn = this.accountService.loggedIn();
    this.account = this.accountService.getAccount();
    if (this.account !== null) {
      this.loggedIn = true;
      this.accountId = this.accountService.getAccountId();
    }
  }

  clickFollow() {
    if (!this.loggedIn) {
      this.router.navigate(['/sign-in'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
    } else {
      this.jobService.follow(this.job.id).subscribe({
        next: () => {
          this.toastr.success('Se mostró tu interés en el trabajo');
          this.send.emit(true);
        },
      })
    }
  }

  clickUnfollow() {
    const accountId = this.accountId!;
    this.jobService.unfollow(this.job.id, accountId).subscribe({
      next: () => {
        this.toastr.success('El trabajo fue eliminado de tus intereses');
        this.send.emit(false);
      }
    })
  }

}
