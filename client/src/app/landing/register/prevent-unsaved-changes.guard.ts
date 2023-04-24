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
    this.modal.title = 'Nueva cuenta';
    this.modal.message = 'Si continúas podrías perder los cambios no salvados';
  }

  canDeactivate(component: RegisterComponent): Observable<boolean> {
    if (component.registerForm?.dirty) {
      return this.confirmService.confirm(this.modal)
    }
    return of(true);
  }

}
