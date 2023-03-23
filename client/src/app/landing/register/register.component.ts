import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors: string[] | null = null;
  maxDate: Date = new Date();
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  complexPassword = "(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*"

  initializeForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60), Validators.pattern(this.complexPassword)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60), this.matchValues('password')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      dateOfBirth: ['', [Validators.required]],
      facebook: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      instagram: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  onSubmit() {
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};
    console.log(values);

    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/')
      },
      error: error => {
        this.toastr.error('Failed to register user');
      }
    })
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset()))
      .toISOString().slice(0,10);
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? {emailExists: true} : null),
            finalize(() => control.markAsTouched())
          )
        })
      )

    }
  }

}
