import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/services/services.service';
import { Category, Photo, Service } from 'src/app/shared/models/service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  serviceForm: FormGroup = new FormGroup({})
  categories?: Category[];
  id: number;
  service?: Service;
  photos: Photo[] = [];

  constructor(private serviceService: ServicesService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadService() {
    this.serviceService.getById(this.id).subscribe({
      next: service => {
        this.service = service;
        this.bcService.set('@serviceNameTitle', service.name);
        this.bcService.set('@serviceEditTitle', 'Edit ' + service.name);
        this.initForm(this.service);
        this.service.servicePhotos.forEach(x => {
          this.photos.push(x.photo)
        });
      },
    })
  }

  loadCategories() {
    this.serviceService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
      },
      complete: () => {
        this.loadService();
      }
    })
  }

  onSubmit() {
    this.serviceService.edit(this.serviceForm.value).subscribe({
      next: () => {
        this.toastr.success('Service updated successfully');
        this.router.navigateByUrl('/account/services/list/' + this.id);
      },
      error: () => {
        this.toastr.error('Failed to update service');
      }
    })
  }

  initForm(service: Service) {
    this.serviceForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      price: ['', [Validators.required]],
      serviceCategory: this.fb.group({
        categoryId: [service.serviceCategory.categoryId, [Validators.required]]
      }),
    })
    this.serviceForm.patchValue(service);
  }

  receive(event: Service) {
    this.service = event;
  }

}
