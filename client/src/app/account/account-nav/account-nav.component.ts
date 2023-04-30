import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { AccountService } from 'src/app/landing/account.service';
import { Account } from 'src/app/shared/models/account';
import { AppUser } from 'src/app/shared/models/app-user';
import { Modal } from 'src/app/shared/models/modal';

@Component({
  selector: 'app-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.scss']
})
export class AccountNavComponent {
  modal: Modal = new Modal;
  account: Account;

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService, private confirmService: ConfirmService) {
      this.account = this.accountService.getAccount()!;
    }

  onClickDeleteAccount() {
    this.modal.title = `Eliminar cuenta`;
    this.modal.message = `¿${this.account.firstName} ${this.account.lastName}, está segura de borrar su cuenta?`;
    this.modal.btnOkText = 'Borrar mi cuenta';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.accountService.deleteAccount().subscribe({
          next: () => {
            this.toastr.success('La cuenta fue eliminada y eliminada con éxito');
            this.accountService.logout();
            this.router.navigateByUrl('/sign-in');
          },
        })
      }
    })
  }

}
