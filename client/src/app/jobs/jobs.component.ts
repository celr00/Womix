import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Area, Job } from '../shared/models/job';
import { JobsParams } from '../shared/models/jobs-params';
import { JobsService } from '../account/jobs/jobs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs?: Job[];
  @ViewChild('search') searchTerm?: ElementRef;
  totalCount = 0;
  params: JobsParams;
  areas?: Area[];
  cardIndex = 1;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];

  constructor(private jobService: JobsService, private route: ActivatedRoute) {
    this.jobService.resetParams();
    this.params = jobService.getParams();
    this.params.areaId = this.route.snapshot.queryParams['area'] || 0;
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadAreas();
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
    return jobs.filter(x => x.id === this.cardIndex)[0];
  }

  isCurrent(job: Job): boolean {
    return job.id === this.cardIndex;
  }

  clickCard(id: number): void {
    this.cardIndex = id;
  }

}
