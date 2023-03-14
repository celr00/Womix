import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors: string[] | null = null;
  maxDate: Date = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)]],
    confirmPassword: ['', Validators.required],
    phone: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    facebook: ['', Validators.required],
    instagram: ['', Validators.required],
  })

  onSubmit() {
    // this.accountService.register(this.registerForm.value).subscribe({
    //   next: () => this.router.navigateByUrl('/shop'),
    //   error: error => this.errors = error.errors
    // })
  }
}
