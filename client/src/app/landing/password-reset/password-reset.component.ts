import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  emailForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private accountService: AccountService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.initializeForm();
  }

  initializeForm(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(100)]]
    })
  }

  onSubmit() {
    const value = this.emailForm.value;
    this.accountService.sendEmailForPasswordReset(value).subscribe({
      next: () => {
        this.toastr.success('Email sent successfully');
      }
    })
  }
}
