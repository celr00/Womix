import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product = {} as Product;

  constructor(private route : ActivatedRoute, private productService: ProductService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    
  }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.productService.getAll().subscribe({
      complete: () => {
        this.product = this.productService.getById(this.id);
        console.log(this.product);
        
      }
    })
  }

}
