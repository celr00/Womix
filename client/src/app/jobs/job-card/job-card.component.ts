import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  @Input() job: Job = {} as Job;
  @Input() show = true;
  @Input() isActive = false;
  fullName: string = '';
  address: string = '';
  photoUrl: string = '';

  ngOnInit(): void {
    const user = this.job.userJob.user;
    const address = this.job.userJob.user.appUserAddress.address;
    this.fullName = `${user.firstName} ${user.lastName}`;
    this.address = `${address.city}, ${address.state}. ${address.zipcode}`;
    this.photoUrl = user.appUserPhoto.photo.url;
  }
}
