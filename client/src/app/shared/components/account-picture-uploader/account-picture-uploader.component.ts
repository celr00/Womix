import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/landing/account.service';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../../models/app-user-entity';
import { Modal } from '../../models/modal';
import { ConfirmService } from 'src/app/core/services/confirm.service';

@Component({
  selector: 'app-account-picture-uploader',
  templateUrl: './account-picture-uploader.component.html',
  styleUrls: ['./account-picture-uploader.component.scss']
})
export class AccountPictureUploaderComponent implements OnInit {
  @Output() sendWithPhoto = new EventEmitter<any>();
  @Input() photoUrl: string = '';
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  modal: Modal = new Modal;
  baseUrl = environment.apiUrl;
  url = '';
  accountId: number;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private confirmService: ConfirmService) {
    this.accountId = this.accountService.getAccountId();
  }

  ngOnInit(): void {
    this.url = `${this.baseUrl}account/photo/${this.accountId}`;
    this.initializeUploader();
  }

  private initializeUploader(): void {
    const token = this.accountService.getAccountToken();
    this.uploader = new FileUploader({
      url: this.url,
      authToken: 'Bearer ' + token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: 10 * 1024 * 1042,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const user: UserEntity = JSON.parse(response);
        this.photoUrl = user.appUserPhoto.photo.url;
      }
    };
  }

  delete() {
    this.modal.title = `Eliminación de foto`;
    this.modal.message = '¿Está seguro de eliminar su foto de perfil?';
    this.modal.btnCancelText = 'Cancelar';
    this.modal.btnOkText = 'Eliminar';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.accountService.removePhoto(this.accountId).subscribe({
          next: () => {
            this.photoUrl = '';
            this.toastr.success('Foto eliminada correctamente');
          }
        })
      }
    })
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

}
