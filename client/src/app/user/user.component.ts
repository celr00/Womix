import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UserService } from './user.service';
import { AppUser } from '../shared/models/app-user';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../shared/models/product';
import { ProductsParams } from '../shared/models/productsParams';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: AppUser = {} as AppUser;
  id: number;
  products: Product[] = [];
  params: ProductsParams;

  constructor(private bcService: BreadcrumbService, private userService: UserService, private route: ActivatedRoute,
    private productService: ProductService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.params = this.productService.getParams();
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
        this.params.userId = this.user.id;
        this.productService.setParams(this.params);
        this.loadUserProducts();
      }
    })
  }

  loadUserProducts() {
    this.productService.getAll().subscribe({
      next: response => {
        this.products = response.data;
      }
    })
  }
}
