import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-account-products',
  templateUrl: './account-products.component.html',
  styleUrls: ['./account-products.component.scss']
})
export class AccountProductsComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getTypes().subscribe({})
  }

}
