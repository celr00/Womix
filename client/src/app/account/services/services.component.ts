import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.serviceService.getCategories().subscribe({})
  }


}
