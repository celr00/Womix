import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/landing/account.service';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../../models/app-user-entity';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from '../../models/modal';

@Component({
  selector: 'app-pdf-uploader',
  templateUrl: './pdf-uploader.component.html',
  styleUrls: ['./pdf-uploader.component.scss']
})
export class PdfUploaderComponent implements OnInit {
  @Input() curriculumUrl: string = '';
  @Output() sendWithCurriculum = new EventEmitter<any>();
  modal: Modal = new Modal;
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  url = '';
  accountId: number;

  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private toastr: ToastrService, private confirmService: ConfirmService) {
      this.accountId = this.accountService.getAccountId();
  }

  ngOnInit(): void {
    this.url = `${this.baseUrl}account/pdf/${this.accountId}`;
    this.initializeUploader();
  }

  initializeUploader() {
    const token = this.accountService.getAccountToken();
    this.uploader = new FileUploader({
      url: this.url,
      authToken: 'Bearer ' + token,
      isHTML5: true,
      allowedFileType: ['pdf'],
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
        this.curriculumUrl = user.appUserCurriculum.curriculum.url;
      }
    };
  }

  delete() {
    this.modal.title = `Eliminación de currículum`;
    this.modal.message = '¿Está seguro de eliminar el currículum?';
    this.modal.btnCancelText = 'Cancelar';
    this.modal.btnOkText = 'Eliminar';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.accountService.deleteCurriculum(this.accountId).subscribe({
          next: () => {
            this.curriculumUrl = '';
            this.toastr.success('Currículum eliminado correctamente');
          }
        })
      }
    })
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }
}
