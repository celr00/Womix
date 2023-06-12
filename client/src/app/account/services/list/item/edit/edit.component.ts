import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { AccountService } from 'src/app/landing/account.service';
import { ServicesService } from 'src/app/services/services.service';
import { Modal } from 'src/app/shared/models/modal';
import { Photo } from 'src/app/shared/models/photo';
import { Category, Service } from 'src/app/shared/models/service';
import { ServiceParams } from 'src/app/shared/models/service-params';
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
  service?: Service;
  id: number;
  photos: Photo[] = [];
  modal: Modal = new Modal;
  accountId: number;
  params: ServiceParams;

  constructor(private serviceService: ServicesService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router, private confirmService: ConfirmService, private accountService: AccountService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountId = this.accountService.getAccountId();
    this.params = this.serviceService.getParams();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.params.userId = this.accountId;
    this.params.pageSize = 12;
    this.serviceService.setParams(this.params);
    this.serviceService.getAll().subscribe({})
  }

  loadService() {
    this.serviceService.getById(this.id).subscribe({
      next: service => {
        this.service = service;
        this.bcService.set('@serviceNameTitle', service.name);
        this.bcService.set('@serviceEditTitle', 'Editar');
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
    const service = this.service!;
    this.modal.title = `Guardad cambios para '${service.name}'`;
    this.modal.message = `¿Confirma los cambios realizados al servicio '${service.name}'?`;
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
      serviceCategory: this.fb.group({
        categoryId: [service.serviceCategory.categoryId, [Validators.required]]
      }),
    })
    this.serviceForm.patchValue(service);
  }

  receive(event: Service) {
    this.service = event;
  }

  delete() {
    const service = this.service!;
    this.modal.title = `Eliminar ${service.name}`;
    this.modal.message = `Confirma querer eliminar el servicio '${service.name}'?`;
    this.modal.btnOkText = 'Eliminar';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.serviceService.delete(this.id).subscribe({
          next: () => {
            this.router.navigateByUrl('/account/services/list');
            this.toastr.success('Servicio eliminado exitosamente');
          },
        })
      }
    })
  }

}
