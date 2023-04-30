import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../jobs.service';
import { AccountService } from 'src/app/landing/account.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/shared/models/job';
import { JobsParams } from 'src/app/shared/models/jobs-params';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event:any) {
    if (this.jobForm?.dirty) {
      $event.returnValue = true;
    }
  }
  jobForm: FormGroup = new FormGroup({})
  areas?: Area[]
  accountId: number;
  params: JobsParams;

  constructor(private bcService: BreadcrumbService, private jobService: JobsService,
    private fb: FormBuilder, private accountService: AccountService, private router: Router,
    private toastr: ToastrService) {
    this.bcService.set('@newJobBreadcrumbTitle', 'Create a new job');
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

  onSubmit() {
    const value = this.jobForm.value;
    this.jobService.add(value).subscribe({
      next: () => {
        this.jobForm.reset(value);
        this.toastr.success('Trabajo agregado exitosamente.');
        this.router.navigateByUrl('/account/jobs/list');
      },
    })
  }

  initForm(areaId: number, userId: number) {
    this.jobForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      salary: ['', [Validators.required]],
      userJob: this.fb.group({
        userId: [userId, [Validators.required]]
      }),
      jobArea: this.fb.group({
        areaId: [areaId, [Validators.required]]
      }),
    })
  }

  loadAreas() {
    this.jobService.getAreas().subscribe({
      next: areas => {
        this.areas = areas;
        this.initForm(areas[0].id, this.accountId);
      },
    })
  }

}
