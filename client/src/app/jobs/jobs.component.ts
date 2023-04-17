import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Area, Job } from '../shared/models/job';
import { JobsParams } from '../shared/models/jobs-params';
import { JobsService } from '../account/jobs/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { UserJobInterest } from '../shared/models/user-job-interest';
import { AccountService } from '../landing/account.service';
import { Account } from '../shared/models/account';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  account: Account | null;
  jobs?: Job[];
  myJobs?: UserJobInterest[];
  totalCount = 0;
  params: JobsParams;
  areas?: Area[];
  cardIndex = 1;
  isIndexFollowed = false;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];

  constructor(private jobService: JobsService, private route: ActivatedRoute,
    private accountService: AccountService) {
    this.jobService.resetParams();
    this.params = jobService.getParams();
    this.params.areaId = this.route.snapshot.queryParams['area'] || 0;
    this.account = this.accountService.getAccount();
    if (this.account === null) this.myJobs = [];
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadAreas();
    if (this.account !== null) {
      this.loadMyInterests();
    }
  }

  loadMyInterests() {
    this.jobService.getInterestedJobsList().subscribe({
      next: res => {
        this.myJobs = res
      }
    })
  }

  loadJobs() {
    this.jobService.getAll().subscribe({
      next: res => {
        this.jobs = res.data;
        this.totalCount = res.count;
        this.cardIndex = this.jobs[0].id;
      }
    });
  }

  loadAreas() {
    this.jobService.getAreas().subscribe({
      next: areas => this.areas = areas
    })
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
    this.loadJobs();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.params = new JobsParams();
    this.jobService.setParams(this.params);
    this.loadJobs();
  }

  selectedCard(jobs: Job[]): Job {
    this.myJobs?.forEach(x => {
      if (x.jobId === this.cardIndex) {
        this.isIndexFollowed = true;
      }
    })
    return jobs.filter(x => x.id === this.cardIndex)[0];
  }

  isCurrent(job: Job): boolean {
    return job.id === this.cardIndex;
  }

  clickCard(id: number): void {
    this.cardIndex = id;
  }

}
