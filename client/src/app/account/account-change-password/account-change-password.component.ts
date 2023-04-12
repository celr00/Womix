import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/landing/account.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-account-change-password',
  templateUrl: './account-change-password.component.html',
  styleUrls: ['./account-change-password.component.scss']
})
export class AccountChangePasswordComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if (this.passwordForm?.touched) {
      $event.returnValue = true;
    }
  }
  passwordForm: FormGroup = new FormGroup({});
  complexPassword = "(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"

  constructor(private bcService: BreadcrumbService, private fb: FormBuilder,
    private accountService: AccountService, private toastr: ToastrService) {
    this.bcService.set('@changePassword', 'Change password');
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60), Validators.pattern(this.complexPassword)]],
      repeatNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60), this.matchValues('newPassword')]],
    })
    this.passwordForm.controls['newPassword'].valueChanges.subscribe({
      next: () => this.passwordForm.controls['repeatNewPassword'].updateValueAndValidity()
    })
  }

  private matchValues(matchTo: string): Validators {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }


  onSubmit() {
    this.accountService.resetPassword(this.passwordForm.value).subscribe({
      next: () => {
        this.toastr.success('Password changed successfully');
        this.passwordForm.reset();
      },
      error: () => {

      }
    })
  }



}
