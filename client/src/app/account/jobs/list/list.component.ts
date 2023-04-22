import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Job } from 'src/app/shared/models/job';
import { JobsService } from '../jobs.service';
import { JobsParams } from 'src/app/shared/models/jobs-params';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from 'src/app/landing/account.service';
import { AppUser } from 'src/app/shared/models/app-user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  @Input() jobs?: Job[];
  params: JobsParams;
  totalCount = 0;
  user: AppUser = {} as AppUser;

  constructor(private jobService: JobsService, private accountService: AccountService,
    private bcService: BreadcrumbService) {
    this.jobService.resetParams();
    this.params = this.jobService.getParams();
    this.bcService.set('@jobsListComponentBreadcrumbTitle', 'My jobs');
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.accountService.getUser().subscribe({
      next: user => {
        this.user = user;
      },
      complete: () => {
        this.params.userId = this.user.id;
        this.params.pageSize = 12;
        this.jobService.setParams(this.params);
        this.loadJobs();
      }
    })
  }

  loadJobs() {
    this.jobService.getAll().subscribe({
      next: response => {
        this.jobs = response.data;
        this.totalCount = response.count;
      }
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

  onIdClick() {
    switch (this.params.sort) {
      case 'idDesc':
        this.params.sort = 'idAsc';
        this.jobService.setParams(this.params);
        break;
      case 'idAsc':
        this.params.sort = 'idDesc';
        this.jobService.setParams(this.params);
        break;

      default:
        this.params.sort = 'idAsc';
        this.jobService.setParams(this.params);
        break;
    }
    this.loadJobs();
  }

  onNameClick() {
    switch (this.params.sort) {
      case 'nameDesc':
        this.params.sort = 'nameAsc';
        this.jobService.setParams(this.params);
        break;
      case 'nameAsc':
        this.params.sort = 'nameDesc';
        this.jobService.setParams(this.params);
        break;

      default:
        this.params.sort = 'nameAsc';
        this.jobService.setParams(this.params);
        break;
    }
    this.loadJobs();
  }

  onDescriptionClick() {
    switch (this.params.sort) {
      case 'descriptionDesc':
        this.params.sort = 'descriptionAsc';
        this.jobService.setParams(this.params);
        break;
      case 'descriptionAsc':
        this.params.sort = 'descriptionDesc';
        this.jobService.setParams(this.params);
        break;

      default:
        this.params.sort = 'descriptionAsc';
        this.jobService.setParams(this.params);
        break;
    }
    this.loadJobs();
  }

  onAreaClick() {
    switch (this.params.sort) {
      case 'areaDesc':
        this.params.sort = 'areaAsc';
        this.jobService.setParams(this.params);
        break;
      case 'areaAsc':
        this.params.sort = 'areaDesc';
        this.jobService.setParams(this.params);
        break;

      default:
        this.params.sort = 'areaAsc';
        this.jobService.setParams(this.params);
        break;
    }
    this.loadJobs();
  }

  onSalaryClick() {
    switch (this.params.sort) {
      case 'salaryDesc':
        this.params.sort = 'salaryAsc';
        this.jobService.setParams(this.params);
        break;
      case 'salaryAsc':
        this.params.sort = 'salaryDesc';
        this.jobService.setParams(this.params);
        break;

      default:
        this.params.sort = 'salaryAsc';
        this.jobService.setParams(this.params);
        break;
    }
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

}
