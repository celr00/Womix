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
    this.modal.title = 'Nuevo Servicio';
    this.modal.message = 'Si continúa perderá los cambios no guardados en este nuevo servicio.';
  }

  canDeactivate(component: NewComponent): Observable<boolean> {
    if (component.serviceForm?.touched) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}
