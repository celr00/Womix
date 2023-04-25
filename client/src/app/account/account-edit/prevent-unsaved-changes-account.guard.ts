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
    this.modal.title = '¿Perder los cambios no guardados?';
    this.modal.message = '¿Está seguro de perder los cambios no guardados realizados en su cuenta?';
  }

  canDeactivate(component: AccountEditComponent): Observable<boolean> {
    if (component.userForm?.dirty) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}
