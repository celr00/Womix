import { Component, OnInit } from '@angular/core';
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

}
