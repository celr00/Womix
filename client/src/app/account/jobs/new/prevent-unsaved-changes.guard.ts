import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NewComponent } from './new.component';
import { Modal } from 'src/app/shared/models/modal';
import { ConfirmService } from 'src/app/core/services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<NewComponent> {
  modal: Modal = new Modal;

  constructor(private confirmService: ConfirmService) {
    this.modal.title = 'Nuevo Trabajo';
    this.modal.message = 'Si continúa perderá los cambios no guardados en este nuevo trabajo.';
  }

  canDeactivate(component: NewComponent): Observable<boolean> {
    if (component.jobForm?.touched) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }
}
