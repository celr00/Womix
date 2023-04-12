import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountChangePasswordComponent } from './account-change-password.component';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesPasswordGuard implements CanDeactivate<AccountChangePasswordComponent> {
  modal: Modal = new Modal;

  constructor(private confirmService: ConfirmService) {
    this.modal.title = 'Leave password reset process';
    this.modal.message = 'Are you sure to lose your password reset progress';
  }

  canDeactivate(component: AccountChangePasswordComponent): Observable<boolean> {
    if (component.passwordForm?.touched) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}