import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UserService } from './user.service';
import { AppUser } from '../shared/models/app-user';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../shared/models/product';
import { ProductsParams } from '../shared/models/productsParams';
import { ServicesService } from '../services/services.service';
import { Service } from '../shared/models/service';
import { ServiceParams } from '../shared/models/service-params';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: AppUser = {} as AppUser;
  id: number;
  products: Product[] = [];
  services: Service[] = [];
  productParams: ProductsParams;
  serviceParams: ServiceParams;

  constructor(private bcService: BreadcrumbService, private userService: UserService, private route: ActivatedRoute, private productService: ProductService, private serviceService: ServicesService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productParams = this.productService.getParams();
    this.serviceParams = this.serviceService.getParams();
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.id).subscribe({
      next: user => {
        this.user = user;
        this.bcService.set('@userName', user.fullName);
      },
      complete: () => {
        this.productParams.userId = this.user.id;
        this.productService.setParams(this.productParams);
        this.serviceParams.userId = this.user.id;
        this.serviceService.setParams(this.serviceParams);
        this.loadProducts();
        this.loadServices();
      }
    })
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: response => {
        this.products = response.data;
      }
    })
  }

  loadServices() {
    this.serviceService.getAll().subscribe({
      next: res => {
        this.services = res.data;
      }
    })
  }
}
