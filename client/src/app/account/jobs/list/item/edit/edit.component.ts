import { Component, HostListener, OnInit } from '@angular/core';
import { JobsService } from '../../../jobs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Area, Job } from 'src/app/shared/models/job';
import { JobsParams } from 'src/app/shared/models/jobs-params';
import { AccountService } from 'src/app/landing/account.service';
import { Photo } from 'src/app/shared/models/photo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if (this.jobForm?.dirty) {
      $event.returnValue = true;
    }
  }
  jobForm: FormGroup = new FormGroup({})
  areas?: Area[];
  job?: Job;
  id: number;
  photos: Photo[] = [];
  modal: Modal = new Modal;
  accountId: number;
  params: JobsParams;

  constructor(private jobService: JobsService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router, private confirmService: ConfirmService, private accountService: AccountService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.accountId = this.accountService.getAccountId();
    this.params = this.jobService.getParams();
  }

  ngOnInit(): void {
    this.loadAreas();
    this.params.userId = this.accountId;
    this.params.pageSize = 12;
    this.jobService.setParams(this.params);
    this.jobService.getAll().subscribe({})
  }

  loadJob() {
    this.jobService.getById(this.id).subscribe({
      next: job => {
        this.job = job;
        this.bcService.set('@jobItemComponentBreadcrumbTitle', job.name);
        this.bcService.set('@jobEditItemBreadCrumbTitle', 'Editar');
        this.initForm(this.job);
        this.modal.title = `Trabajo ${this.job.name}`;
        this.modal.message = `¿Confirma los cambios realizados en: '${this.job.name}'?`;
      },
    })
  }

  loadAreas() {
    this.jobService.getAreas().subscribe({
      next: areas => {
        this.areas = areas;
      },
      complete: () => {
        this.loadJob();
      }
    })
  }

  onSubmit() {
    const job = this.job!
    this.modal.title = `Guardar cambios para: ${job.name}`;
    this.modal.message = `¿Desea confirmar los cambios realizados a: ${job.name}?`;
    const value = this.jobForm.value;
    this.confirmService.confirm(this.modal).subscribe({
      next: (modal) => {
        modal && this.jobService.edit(value).subscribe({
          next: () => {
            this.jobForm.reset(value);
            this.toastr.success('Trabajo actualizado correctamente');
            this.router.navigateByUrl('/account/jobs/list/' + this.id);
          },
        })
      }
    })
  }

  initForm(job: Job) {
    this.jobForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      salary: ['', [Validators.required]],
      jobArea: this.fb.group({
        areaId: [job.jobArea.areaId, [Validators.required]]
      }),
    })
    this.jobForm.patchValue(job);
  }

  receive(event: Job) {
    this.job = event;
  }

  delete() {
    const job = this.job!;
    this.modal.title = `Eliminar ${job.name}`;
    this.modal.message = `Confirma querer eliminar el trabajo '${job.name}'?`;
    this.modal.btnOkText = 'Eliminar';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.jobService.delete(this.id).subscribe({
          next: () => {
            this.router.navigateByUrl('/account/jobs/list');
            this.toastr.success('Trabajo eliminado exitosamente');
          },
        })
      }
    })
  }

}
