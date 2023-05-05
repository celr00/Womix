import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  token: string | null = null;
  emailForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  complexPassword = "(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"

  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private accountService: AccountService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.initEmailForm();
    this.initPasswordForm();
  }

  private initEmailForm(): void {
    this.emailForm = this.fb.group({
      email: ['ramiro@castellanosbarron.com', [Validators.email, Validators.required, Validators.maxLength(100)]]
    })
  }

  private initPasswordForm() {
    this.passwordForm = this.fb.group({
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

  onSubmitEmail(): void {
    const value = this.emailForm.controls['email'].value;
    console.log(value);

    this.accountService.sendEmailForPasswordReset(value).subscribe({
      next: () => {
        this.toastr.success('Email sent successfully');
      }
    })
  }

  onSubmitPassword(): void {
    
  }
}
