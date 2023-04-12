import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountProductsNewComponent } from './account-products-new.component';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<AccountProductsNewComponent> {
  modal: Modal = new Modal;

  constructor(private confirmService: ConfirmService) {
    this.modal.title = 'New product';
    this.modal.message = 'Are you sure to lose unsaved changes for your new product?';
  }

  canDeactivate(component: AccountProductsNewComponent): Observable<boolean> {
    if (component.productForm?.touched) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}