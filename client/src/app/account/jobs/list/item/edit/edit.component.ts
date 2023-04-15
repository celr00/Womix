import { Component, HostListener, OnInit } from '@angular/core';
import { JobsService } from '../../../jobs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Modal } from 'src/app/shared/models/modal';
import { Photo } from 'src/app/shared/models/service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Area, Job } from 'src/app/shared/models/job';
import { JobWithInterest } from 'src/app/shared/models/job-with-interest';

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
  id: number;
  job: JobWithInterest = {} as JobWithInterest;
  photos: Photo[] = [];
  modal: Modal = new Modal;

  constructor(private jobService: JobsService, private fb: FormBuilder,
    private route: ActivatedRoute, private bcService: BreadcrumbService, private toastr: ToastrService,
    private router: Router, private confirmService: ConfirmService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAreas();
  }

  loadJob() {
    this.jobService.getById(this.id).subscribe({
      next: job => {
        this.job = job;
        this.bcService.set('@jobItemComponentBreadcrumbTitle', job.name);
        this.bcService.set('@jobEditItemBreadCrumbTitle', 'Edit ' + job.name);
        this.initForm(this.job);
        this.modal.title = `Job ${this.job.name}`;
        this.modal.message = `Do you confirm changes made to the job '${this.job.name}'?`;
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
    this.modal.title = `Save changes for ${this.job.name}`;
    this.modal.message = `Do you want to confirm changes made to your job ${this.job.name}`;
    const value = this.jobForm.value;
    this.confirmService.confirm(this.modal).subscribe({
      next: (modal) => {
        modal && this.jobService.edit(value).subscribe({
          next: () => {
            this.jobForm.reset(value);
            this.toastr.success('Job updated successfully');
            this.router.navigateByUrl('/account/jobs/list/' + this.id);
          },
        })
      }
    })
  }

  initForm(job: JobWithInterest) {
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

  receive(event: JobWithInterest) {
    this.job = event;
  }

}
