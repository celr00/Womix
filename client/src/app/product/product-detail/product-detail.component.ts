import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AppUser } from 'src/app/shared/models/app-user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product = {} as Product;
  owner: AppUser = {} as AppUser;

  constructor(private route : ActivatedRoute, private productService: ProductService,
    private bcService: BreadcrumbService, private userService: UserService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@productDetails', product.name)
      },
      complete: () => {
        this.loadOwner(this.product.seller.id);
      }
    })
  }

  loadOwner(ownerId: number) {
    this.userService.getUser(ownerId).subscribe({
      next: owner => {
        this.owner = owner;
      }
    })
  }

}
