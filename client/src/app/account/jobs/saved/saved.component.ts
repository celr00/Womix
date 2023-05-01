import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobsService } from '../jobs.service';
import { Job } from 'src/app/shared/models/job';
import { AccountService } from 'src/app/landing/account.service';
import { JobsParams } from 'src/app/shared/models/jobs-params';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit{
  @ViewChild('search') searchTerm?: ElementRef;
  jobs?: Job[]
  accountId: number;
  totalCount = 0;
  params: JobsParams;
  cardIndex = 1;
  isFollowed = false;
  disableFollow = false;
  count = 1;

  constructor(private jobService: JobsService, private accountService: AccountService) {
    this.accountId = this.accountService.getAccountId();
    this.params = this.jobService.getParams();
  }

  ngOnInit(): void {
    this.params.followerId = this.accountId;
    this.params.userId = 0;
    this.jobService.setParams(this.params);
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getAll().subscribe({
      next: (res) => {
        this.jobs = res.data;
        this.totalCount = res.count;
        if (this.count === 1) {
          this.cardIndex = this.jobs[0].id;
          this.count--;
          this.onCardClick(this.jobs![0].id);
        }
      },
    });
  }

  onPageChanged(event: any) {
    const params = this.jobService.getParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.jobService.setParams(params);
      this.params = params;
      this.loadJobs();
    }
  }

  onSearch() {
    const params = this.jobService.getParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.jobService.setParams(params);
    this.params = params;
    this.loadJobs();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.params = new JobsParams();
    this.params.followerId = this.accountId;
    this.jobService.setParams(this.params);
    this.loadJobs();
  }

  selectedCard(jobs: Job[]): Job {
    return jobs.filter((x) => x.id === this.cardIndex)[0];
  }

  isCurrent(job: Job): boolean {
    return job.id === this.cardIndex;
  }

  onCardClick(jobId: number): void {
    this.cardIndex = jobId;
    const job = this.jobs!.find(x => x.id === jobId)!;
    if (job.userJobInterests.length > 0) {
      job.userJobInterests.forEach(interest => {
        if (interest.userId === this.accountId) {
          this.isFollowed = true;
        } else {
          this.isFollowed = false;
        }
      })
    }
    if (job.userJobInterests.length === 0) {
      this.isFollowed = false;
    }
    if (job.userJob.userId === this.accountId) {
      this.disableFollow = true;
    } else {
      this.disableFollow = false;
    }
  }

  receive(event: boolean) {
    this.isFollowed = event;
    this.loadJobs();
  }

}
