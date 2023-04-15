import { Component, OnInit } from '@angular/core';
import { UserJobInterest } from 'src/app/shared/models/user-job-interest';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit{
  userJobs: UserJobInterest[] = [];

  constructor(private jobService: JobsService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getInterestedJobsList().subscribe({
      next: res => this.userJobs = res
    })
  }

}
