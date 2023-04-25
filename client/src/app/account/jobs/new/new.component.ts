import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../jobs.service';
import { AccountService } from 'src/app/landing/account.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/shared/models/app-user';
import { Area } from 'src/app/shared/models/job';

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
  areas: Area[] = [];
  user: AppUser = {} as AppUser;

  constructor(private bcService: BreadcrumbService, private jobService: JobsService,
    private fb: FormBuilder, private accountService: AccountService, private router: Router,
    private toastr: ToastrService) {
    this.bcService.set('@newJobBreadcrumbTitle', 'Create a new job');
  }

  ngOnInit(): void {
    this.loadAreas();
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
      },
      complete: () => {
        this.loadUser();
      }
    })
  }

  loadUser() {
    this.accountService.getUser().subscribe({
      next: user => {
        this.user = user;
      },
      complete: () => {
        this.initForm(this.areas[0].id, this.user.id);
      }
    })
  }

}
