import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { AccountService } from 'src/app/landing/account.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { Modal } from 'src/app/shared/models/modal';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.scss']
})
export class AccountNavComponent {
  @Input() user: AppUser = {} as AppUser;
  modal: Modal = new Modal;

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService, private confirmService: ConfirmService) {}

  onClickDeleteAccount() {
    this.modal.title = `Delete account`;
    this.modal.message = `${this.user.fullName}, are you sure to delete your account?`;
    this.modal.btnOkText = 'Delete my account';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.accountService.deleteAccount().subscribe({
          next: () => {
            this.toastr.success('The account was deleted and removed successfully');
            this.accountService.logout();
            this.router.navigateByUrl('/sign-in');
          },
        })
      }
    })
  }

}
