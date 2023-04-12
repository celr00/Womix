import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';
import { ConsentDialogComponent } from 'src/app/shared/components/modals/consent-dialog/consent-dialog.component';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class RegisterConsentService {
  bsModalRef?: BsModalRef<ConsentDialogComponent>;

  constructor(private modalService: BsModalService) { }

  confirm(modal?: Modal, register = false): Observable<boolean> {
    const config = {
      initialState: {
        ...modal
      }
    }
    this.bsModalRef = this.modalService.show(ConsentDialogComponent, config);
    return this.bsModalRef.onHidden!.pipe(
      map(() => {
        return this.bsModalRef!.content!.result
      })
    )
  }
}
