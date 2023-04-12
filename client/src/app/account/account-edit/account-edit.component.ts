import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { AccountService } from 'src/app/landing/account.service';
import { UserEntity } from 'src/app/shared/models/app-user-entity';
import { Modal } from 'src/app/shared/models/modal';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if (this.userForm?.dirty) {
      $event.returnValue = true;
    }
  }
  userForm: FormGroup = new FormGroup({})
  user: UserEntity = {} as UserEntity;
  maxDate: Date = new Date();
  modal: Modal = new Modal;

  constructor(private accountService: AccountService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router, private confirmService: ConfirmService) {
      this.bcService.set('@editProfileTitle', 'Edit Profile');
    }

  ngOnInit(): void {
    this.loadUser();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  onSubmit() {
    this.modal.title = `${this.user.firstName} ${this.user.lastName} profile information`;
    this.modal.message = 'Do you confirm changes made to your account information?';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.accountService.update(this.userForm.value).subscribe({
          next: user => {
            this.user = user;
            this.userForm.reset();
            this.userForm.patchValue(user);
            this.toastr.success('User updated successfully');
          },
        })
      }
    })
  }

  loadUser() {
    this.accountService.getUserEntity().subscribe({
      next: user => {
        this.user = user;
      },
      complete: () => {
        this.initForm(this.user.dateOfBirth);
      }
    })
  }

  initForm(dob: Date) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: [dob, [Validators.required]],
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      appUserPhoto: this.fb.group({
        userId: ['', [Validators.required]],
        photoId: ['', [Validators.required]],
        photo: this.fb.group({
          url: ['', [Validators.required]],
          id: ['', [Validators.required]],
        })
      }),
      appUserAddress: this.fb.group({
        userId: ['', [Validators.required]],
        addressId: ['', [Validators.required]],
        address: this.fb.group({
          number: ['', [Validators.required]],
          street: ['', [Validators.required]],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          zipcode: ['', [Validators.required]],
          id: ['', [Validators.required]],
        })
      })
    })

    this.userForm.patchValue(this.user);
  }

}
