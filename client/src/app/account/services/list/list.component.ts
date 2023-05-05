import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/landing/account.service';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/shared/models/service';
import { ServiceParams } from 'src/app/shared/models/service-params';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  services?: Service[];
  params: ServiceParams;
  totalCount = 0;
  accountId: number;
  showTable = true;

  constructor(private serviceService: ServicesService, private accountService: AccountService,
    private bcService: BreadcrumbService, private router: Router) {
    this.serviceService.resetParams();
    this.params = this.serviceService.getParams();
    this.bcService.set('@servicesListTitle', 'My services');
    this.accountId = this.accountService.getAccountId();
  }

  ngOnInit(): void {
    this.params.userId = this.accountId;
    this.params.pageSize = 12;
    this.serviceService.setParams(this.params);
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getAll().subscribe({
      next: response => {
        this.services = response.data;
        this.totalCount = response.count;
      }
    })
  }

  onPageChanged(event: any) {
    const params = this.serviceService.getParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.serviceService.setParams(params);
      this.params = params;
      this.loadServices();
    }
  }

  onIdClick() {
    switch (this.params.sort) {
      case 'idDesc':
        this.params.sort = 'idAsc';
        this.serviceService.setParams(this.params);
        break;
      case 'idAsc':
        this.params.sort = 'idDesc';
        this.serviceService.setParams(this.params);
        break;

      default:
        this.params.sort = 'idAsc';
        this.serviceService.setParams(this.params);
        break;
    }
    this.loadServices();
  }

  onNameClick() {
    switch (this.params.sort) {
      case 'nameDesc':
        this.params.sort = 'nameAsc';
        this.serviceService.setParams(this.params);
        break;
      case 'nameAsc':
        this.params.sort = 'nameDesc';
        this.serviceService.setParams(this.params);
        break;

      default:
        this.params.sort = 'nameAsc';
        this.serviceService.setParams(this.params);
        break;
    }
    this.loadServices();
  }

  onDescriptionClick() {
    switch (this.params.sort) {
      case 'descriptionDesc':
        this.params.sort = 'descriptionAsc';
        this.serviceService.setParams(this.params);
        break;
      case 'descriptionAsc':
        this.params.sort = 'descriptionDesc';
        this.serviceService.setParams(this.params);
        break;

      default:
        this.params.sort = 'descriptionAsc';
        this.serviceService.setParams(this.params);
        break;
    }
    this.loadServices();
  }

  onCategoryClick() {
    switch (this.params.sort) {
      case 'categoryDesc':
        this.params.sort = 'categoryAsc';
        this.serviceService.setParams(this.params);
        break;
      case 'categoryAsc':
        this.params.sort = 'categoryDesc';
        this.serviceService.setParams(this.params);
        break;

      default:
        this.params.sort = 'categoryAsc';
        this.serviceService.setParams(this.params);
        break;
    }
    this.loadServices();
  }

  onSearch() {
    const params = this.serviceService.getParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.serviceService.setParams(params);
    this.params = params;
    this.loadServices();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.params = new ServiceParams();
    this.params.userId = this.accountId;
    this.params.pageSize = 12;
    this.serviceService.setParams(this.params);
    this.loadServices();
  }

  visit(id: number) {
    this.router.navigateByUrl(`/account/services/list/${id}`);
  }

}
