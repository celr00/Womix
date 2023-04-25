import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EditComponent } from './edit.component';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<EditComponent> {
  modal: Modal = new Modal;

  constructor(private confirmService: ConfirmService) {
    this.modal.title = 'Editar Servicio';
    this.modal.message = 'Si contiúa perderá los cambios no guardados a este servicio.';
  }

  canDeactivate(component: EditComponent): Observable<boolean> {
    if (component.serviceForm?.dirty) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}
