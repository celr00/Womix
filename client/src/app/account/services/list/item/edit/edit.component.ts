import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { ServicesService } from 'src/app/services/services.service';
import { Modal } from 'src/app/shared/models/modal';
import { Category, Photo, Service } from 'src/app/shared/models/service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if (this.serviceForm?.dirty) {
      $event.returnValue = true;
    }
  }
  serviceForm: FormGroup = new FormGroup({})
  categories?: Category[];
  id: number;
  service: Service = {} as Service;
  photos: Photo[] = [];
  modal: Modal = new Modal;

  constructor(private serviceService: ServicesService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router, private confirmService: ConfirmService) {
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
        this.modal.title = `Servicio ${this.service.name}`;
        this.modal.message = `¿Confirma los cambios realizados para '${this.service.name}'?`;
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
    this.modal.title = `Guardad cambios para '${this.service.name}'`;
    this.modal.message = `¿Confirma los cambios realizados al servicio '${this.service.name}'?`;
    const value = this.serviceForm.value;
    this.confirmService.confirm(this.modal).subscribe({
      next: (modal) => {
        modal && this.serviceService.edit(value).subscribe({
          next: () => {
            this.serviceForm.reset(value);
            this.toastr.success('Servicio actualizado correctamente.');
            this.router.navigateByUrl('/account/services/list/' + this.id);
          },
        })
      }
    })
  }

  initForm(service: Service) {
    this.serviceForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
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
