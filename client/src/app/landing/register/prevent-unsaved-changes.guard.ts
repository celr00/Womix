import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegisterComponent } from './register.component';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<RegisterComponent> {
  modal: Modal = new Modal;

  constructor(private confirmService: ConfirmService) {
    this.modal.title = 'New account';
    this.modal.message = 'Are you sure to lose unsaved changes for your new account?';
  }

  canDeactivate(component: RegisterComponent): Observable<boolean> {
    if (component.registerForm?.dirty) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}
