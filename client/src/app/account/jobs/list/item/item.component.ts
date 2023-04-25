import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models/job';
import { Modal } from 'src/app/shared/models/modal';
import { JobsService } from '../../jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { JobWithInterest } from 'src/app/shared/models/job-with-interest';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  id: number;
  job: JobWithInterest = {} as JobWithInterest;
  modal: Modal = new Modal;

  constructor(private route: ActivatedRoute, private bcService: BreadcrumbService,
    private jobService: JobsService, private router: Router, private toastr: ToastrService,
    private confirmService: ConfirmService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadJob();
  }

  loadJob() {
    this.jobService.getById(this.id).subscribe({
      next: job => {
        this.job = job;
        this.bcService.set('@jobItemComponentBreadcrumbTitle', job.name);
      }
    })
  }

  delete() {
    this.modal.title = `Borrar ${this.job.name}`;
    this.modal.message = `¿Confirma querer eliminar el trabajo: '${this.job.name}'?`;
    this.modal.btnOkText = 'Eliminar';
    this.confirmService.confirm(this.modal).subscribe({
      next: modal => {
        modal && this.jobService.delete(this.id).subscribe({
          next: () => {
            this.router.navigateByUrl('/account/jobs/list');
            this.toastr.success('Trabajo eliminado correctamente.');
          },
        })
      }
    })
  }

}
