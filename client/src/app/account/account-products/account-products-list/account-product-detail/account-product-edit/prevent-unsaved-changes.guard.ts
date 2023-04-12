import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountProductEditComponent } from './account-product-edit.component';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<AccountProductEditComponent> {
  modal: Modal = new Modal;

  constructor(private confirmService: ConfirmService) {
    this.modal.title = 'Product edit';
    this.modal.message = 'Are you sure to lose changes made to this product?';
  }

  canDeactivate(component: AccountProductEditComponent): Observable<boolean> {
    if (component.productForm?.dirty) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}
