import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/modals/confirm-dialog/confirm-dialog.component';
import { Modal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef?: BsModalRef<ConfirmDialogComponent>;

  constructor(private modalService: BsModalService) { }

  confirm(modal?: Modal): Observable<boolean> {
    const config = {
      initialState: {
        ...modal
      }
    }
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);
    return this.bsModalRef.onHidden!.pipe(
      map(() => {
        return this.bsModalRef!.content!.result
      })
    )
  }
}
