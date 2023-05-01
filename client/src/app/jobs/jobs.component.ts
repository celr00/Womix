import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Area, Job } from '../shared/models/job';
import { JobsParams } from '../shared/models/jobs-params';
import { JobsService } from '../account/jobs/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../landing/account.service';
import { Account } from '../shared/models/account';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  account: Account | null;
  jobs?: Job[]
  areas?: Area[];
  totalCount = 0;
  params: JobsParams;
  selectedCardId = 1;
  loggedIn = false;
  isFollowed = false;
  disableFollow = false;
  accountId?: number
  count = 1;
  sortOptions = [
    { name: 'Alfabéticamente', value: 'name' },
    { name: 'Precio: Mayor a menor', value: 'priceDesc' },
    { name: 'Precio: Menor a mayor', value: 'priceAsc' },
  ];

  constructor(private jobService: JobsService, private route: ActivatedRoute,
    private accountService: AccountService) {
    this.jobService.resetParams();
    this.params = jobService.getParams();
    this.params.areaId = this.route.snapshot.queryParams['area'] || 0;
    this.account = this.accountService.getAccount();
    if (this.account !== null) {
      this.loggedIn = true;
      this.accountId = this.accountService.getAccountId();
    }
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadAreas();
  }

  loadJobs(select = true) {
    this.jobService.getAll().subscribe({
      next: (res) => {
        this.jobs = res.data;
        this.totalCount = res.count;
        if (select) {
          const cardId = this.jobs[0].id;
          this.selectedCardId = cardId;
          this.onCardClick(cardId);
          this.count--;
        }
      },
    });
  }

  loadAreas() {
    this.jobService.getAreas().subscribe({
      next: areas => this.areas = areas,
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

  onSortSelected(event: any) {
    const params = this.jobService.getParams();
    params.sort = event.target.value;
    this.jobService.setParams(params);
    this.params = params;
    this.loadJobs();
  }

  onCategorySelected(id: number) {
    const params = this.jobService.getParams();
    params.areaId = id;
    params.pageNumber = 1;
    this.jobService.setParams(params);
    this.params = params;
    this.loadJobs();
  }

  onSearch() {
    const params = this.jobService.getParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.jobService.setParams(params);
    this.params = params;
    this.loadJobs(true);
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.params = new JobsParams();
    this.jobService.setParams(this.params);
    this.loadJobs();
  }

  selectedCard(jobs: Job[]): Job {
    return jobs.filter((x) => x.id === this.selectedCardId)[0];
  }

  isCurrent(job: Job): boolean {
    return job.id === this.selectedCardId;
  }

  onCardClick(jobId: number): void {
    this.selectedCardId = jobId;
    const job = this.jobs!.find(x => x.id === jobId)!;
    if (this.accountId) {
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
  }

  receive(event: boolean) {
    this.isFollowed = event;
    this.loadJobs();
  }
}
