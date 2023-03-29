import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/landing/account.service';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.scss']
})
export class AccountNavComponent {

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) {}

  onClickDeleteAccount() {
    this.accountService.deleteAccount().subscribe({
      next: () => {
        this.toastr.success('The account was deleted and removed successfully');
        this.accountService.logout();
        this.router.navigateByUrl('/sign-in');
      },
      error: () => {
        this.toastr.error('Failed to delete the account');
      }
    })
  }

}
