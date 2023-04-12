import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NewComponent } from './new.component';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<NewComponent> {
  modal: Modal = new Modal;

  constructor(private confirmService: ConfirmService) {
    this.modal.title = 'New service';
    this.modal.message = 'Are you sure to lose unsaved changes for your new service?';
  }

  canDeactivate(component: NewComponent): Observable<boolean> {
    if (component.serviceForm?.touched) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}
