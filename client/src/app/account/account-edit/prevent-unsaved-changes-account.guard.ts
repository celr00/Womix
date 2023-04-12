import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountEditComponent } from './account-edit.component';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesAccountGuard implements CanDeactivate<AccountEditComponent> {
  modal: Modal = new Modal;

  constructor(private confirmService: ConfirmService) {
    this.modal.title = 'Lose unsaved changes?';
    this.modal.message = 'Are you sure to lose the unsaved changes made to your account?';
  }

  canDeactivate(component: AccountEditComponent): Observable<boolean> {
    if (component.userForm?.dirty) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}
