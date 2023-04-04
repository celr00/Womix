import { AfterViewChecked, AfterViewInit, Component, ContentChild, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Category, Service } from '../shared/models/service';
import { ServiceParams } from '../shared/models/service-params';
import { ServicesService } from './services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewChecked {
  services?: Service[];
  @ViewChild('search') searchTerm?: ElementRef;
  totalCount = 0;
  params: ServiceParams;
  categories?: Category[];
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ];

  constructor(private serviceService: ServicesService, private route: ActivatedRoute, private renderer: Renderer2) {
    this.serviceService.resetParams();
    this.params = serviceService.getParams();
    this.params.categoryId = this.route.snapshot.queryParams['category'] || 0;
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
  }

  ngAfterViewChecked(): void {

  }

  loadServices() {
    this.serviceService.getAll().subscribe({
      next: res => {
        this.services = res.data;
        this.totalCount = res.count;
      }
    });
  }

  loadCategories() {
    this.serviceService.getCategories().subscribe({
      next: categories => {
        this.categories = categories
      }
    })
  }

  onPageChanged(event: any) {
    const params = this.serviceService.getParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.serviceService.setParams(params);
      this.params = params;
      this.loadServices();
    }
  }

  onSortSelected(event: any) {
    const params = this.serviceService.getParams();
    params.sort = event.target.value;
    this.serviceService.setParams(params);
    this.params = params;
    this.loadServices();
  }

  onCategorySelected(id: number) {
    const params = this.serviceService.getParams();
    params.categoryId = id;
    params.pageNumber = 1;
    this.serviceService.setParams(params);
    this.params = params;
    this.loadServices();
  }

  onSearch() {
    const params = this.serviceService.getParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.serviceService.setParams(params);
    this.params = params;
    this.loadServices();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.params = new ServiceParams();
    this.serviceService.setParams(this.params);
    this.loadServices();
  }
}
