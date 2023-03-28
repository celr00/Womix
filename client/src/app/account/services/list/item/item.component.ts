import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/shared/models/service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  id: number;
  service: Service = {} as Service;

  constructor(private route: ActivatedRoute, private bcService: BreadcrumbService,
    private serviceService: ServicesService, private router: Router, private toastr: ToastrService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadService();
  }

  loadService() {
    this.serviceService.getById(this.id).subscribe({
      next: service => {
        this.service = service;
        this.bcService.set('@serviceNameTitle', service.name);
        console.log(this.bcService);

      }
    })
  }

  delete() {
    this.serviceService.delete(this.id).subscribe({
      next: () => {
        this.router.navigateByUrl('/account/services/list');
        this.toastr.success('Service deleted successfully');
      },
      error: () => {
        this.toastr.error('Failed to delete service');
      }
    })
  }

}
