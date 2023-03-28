import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-account-product-detail',
  templateUrl: './account-product-detail.component.html',
  styleUrls: ['./account-product-detail.component.scss']
})
export class AccountProductDetailComponent implements OnInit {
  id: number;
  product: Product = {} as Product;

  constructor(private route: ActivatedRoute, private bcService: BreadcrumbService,
    private productService: ProductService, private router: Router, private toastr: ToastrService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@productName', product.name);
      }
    })
  }

  delete() {
    this.productService.delete(this.id).subscribe({
      next: () => {
        this.router.navigateByUrl('/account/products/list');
        this.toastr.success('Product deleted successfully');
      },
      error: () => {
        this.toastr.error('Failed to delete product');
      }
    })
  }

}
