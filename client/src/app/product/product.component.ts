import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    products: Product[] = [];

    constructor(private productService: ProductService) {
    }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
        next: products => {
          this.products = products;
          console.log(products);
        },
        error: error => console.log(error)
    })
  }


}
