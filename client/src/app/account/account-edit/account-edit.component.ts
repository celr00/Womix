import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { AccountService } from 'src/app/landing/account.service';
import { UserEntity } from 'src/app/shared/models/app-user-entity';
import { Modal } from 'src/app/shared/models/modal';
import { Photo } from 'src/app/shared/models/service';
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
  user?: UserEntity;
  maxDate: Date = new Date();
  modal: Modal = new Modal;
  photo: Photo[] = [];
  accountId: number;
  curriculumUrl: string = '';
  photoUrl: string = '';

  constructor(private accountService: AccountService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router, private confirmService: ConfirmService) {
      this.bcService.set('@editProfileTitle', 'Edit Profile');
      this.accountId = this.accountService.getAccountId();
    }

  ngOnInit(): void {
    this.loadUser();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  onSubmit() {
    if (!this.user) return;
    this.modal.title = `Perfil de ${this.user.firstName} ${this.user.lastName}`;
    this.modal.message = '¿Confirma los cambios realizados en la información de su cuenta?';
    if (this.user.appUserAddress === null) {
      this.userForm.controls['appUserAddress'].get('userId')?.setValue(0);
      this.userForm.controls['appUserAddress'].get('addressId')?.setValue(0);
      this.userForm.controls['appUserAddress'].get('address')?.get('id')?.setValue(0);
    }
    if (this.user.appUserPhoto === null) {
      this.userForm.controls['appUserPhoto'].get('userId')?.setValue(0);
      this.userForm.controls['appUserPhoto'].get('photoId')?.setValue(0);
      this.userForm.controls['appUserPhoto'].get('photo')?.get('id')?.setValue(0);
    }
    if (this.user.appUserCurriculum === null) {
      this.userForm.controls['appUserCurriculum'].get('userId')?.setValue(0);
      this.userForm.controls['appUserCurriculum'].get('curriculumId')?.setValue(0);
      this.userForm.controls['appUserCurriculum'].get('curriculum')?.get('id')?.setValue(0);
    }
    const dateString = this.userForm.controls['dateOfBirth'].value;
    this.userForm.controls['dateOfBirth'].setValue(this.getDateOnly(dateString));
    const value = this.userForm.value;
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.accountService.update(value).subscribe({
          next: user => {
            this.user = user;
            this.userForm.reset();
            this.userForm.patchValue(user);
            this.toastr.success('Usuario actualizado correctamente.');
          },
        })
      }
    })
  }

  loadUser() {
    this.accountService.getUserEntity().subscribe({
      next: user => {
        this.user = user;
        if (this.user.appUserPhoto === null) {
          this.photo = [];
        }
        else {
          this.photo.push(user.appUserPhoto.photo);
        }
        if (this.user.appUserCurriculum !== null) {
          this.curriculumUrl = user.appUserCurriculum.curriculum.url;
        }
        if (this.user.appUserPhoto !== null) {
          this.photoUrl = user.appUserPhoto.photo.url;
        }
        if (this.user.appUserCurriculum === null) {
          this.curriculumUrl = '';
        }
        if (this.user.appUserPhoto === null) {
          this.photoUrl = '';
        }
        this.initForm(user);
      }
    })
  }

  initForm(user: UserEntity) {
    const dob = new Date(user.dateOfBirth);
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: [dob, [Validators.required]],
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      appUserPhoto: this.fb.group({
        userId: [''],
        photoId: [''],
        photo: this.fb.group({
          url: [''],
          id: [''],
        })
      }),
      appUserCurriculum: this.fb.group({
        userId: [''],
        curriculumId: [''],
        curriculum: this.fb.group({
          url: [''],
          id: [''],
        })
      }),
      appUserAddress: this.fb.group({
        userId: [''],
        addressId: [''],
        address: this.fb.group({
          number: ['', [Validators.required]],
          street: ['', [Validators.required]],
          city: ['', [Validators.required]],
          state: ['', [Validators.required]],
          zipcode: ['', [Validators.required]],
          id: ['']
        })
      })
    })
    this.userForm.patchValue(user);
  }

  private getDateOnly(dob: string) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset()))
      .toISOString().slice(0,10);
  }

  receiveUserWithCurriculum(event: any): void {
    this.loadUser();
  }

  receiveUserWithPhoto(event: any): void {
    this.loadUser();
  }

}
