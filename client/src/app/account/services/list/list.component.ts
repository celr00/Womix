import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/landing/account.service';
import { ServicesService } from 'src/app/services/services.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { Service } from 'src/app/shared/models/service';
import { ServiceParams } from 'src/app/shared/models/service-params';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  user: AppUser = {} as AppUser;
  services: Service[] = [];
  params: ServiceParams;
  totalCount = 0;
  @ViewChild('search') searchTerm?: ElementRef;

  constructor(private serviceService: ServicesService, private accountService: AccountService,
    private bcService: BreadcrumbService) {
    this.serviceService.resetParams();
    this.params = this.serviceService.getParams();
    this.bcService.set('@servicesListTitle', 'My services');
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
        this.serviceService.setParams(this.params);
        this.loadServices();
      }
    })
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

  onPriceClick() {
    switch (this.params.sort) {
      case 'priceDesc':
        this.params.sort = 'priceAsc';
        this.serviceService.setParams(this.params);
        break;
      case 'priceAsc':
        this.params.sort = 'priceDesc';
        this.serviceService.setParams(this.params);
        break;

      default:
        this.params.sort = 'priceAsc';
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
    this.serviceService.setParams(this.params);
    this.loadServices();
  }

}
