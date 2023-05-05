import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/landing/account.service';
import { ServicesService } from 'src/app/services/services.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { Category } from 'src/app/shared/models/service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if (this.serviceForm?.dirty) {
      $event.returnValue = true;
    }
  }
  serviceForm: FormGroup = new FormGroup({})
  categories?: Category[]
  user: AppUser = {} as AppUser;
  accountId: number;

  constructor(private bcService: BreadcrumbService, private serviceService: ServicesService,
    private fb: FormBuilder, private accountService: AccountService, private router: Router,
    private toastr: ToastrService) {
    this.bcService.set('@newServiceTitle', 'Create a new service');
    this.accountId = this.accountService.getAccountId();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  onSubmit() {
    const value = this.serviceForm.value;
    this.serviceService.add(value).subscribe({
      next: () => {
        this.serviceForm.reset(value);
        this.toastr.success('Servicio agregado exitosamente.');
        this.router.navigateByUrl('/account/services/list');
      },
    })
  }

  initForm(categoryId: number, userId: number) {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      userService: this.fb.group({
        userId: [userId, [Validators.required]]
      }),
      serviceCategory: this.fb.group({
        categoryId: [categoryId, [Validators.required]]
      }),
    })
  }

  loadCategories() {
    this.serviceService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.initForm(categories[0].id, this.accountId);
      },
    })
  }

}
