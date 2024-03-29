import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductService } from './product.service';
import { ProductsParams } from '../shared/models/productsParams';
import { Type } from '../shared/models/type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit  {
  @ViewChild('search') searchTerm?: ElementRef;
  products?: Product[];
  totalCount = 0;
  params: ProductsParams;
  types: Type[] = [];
  sortOptions = [
    {name: 'Alfabéticamente', value: 'name'},
    {name: 'Precio: Mayor a menor', value: 'priceDesc'},
    {name: 'Precio: Menor a mayor', value: 'priceAsc'},
  ];

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router) {
    this.productService.resetParams();
    this.params = productService.getParams();
    this.params.itemClassId = this.route.snapshot.queryParams['category'] || 0;
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadTypes();
  }

  loadTypes() {
    this.productService.getTypes().subscribe({
      next: types => {
        this.types = types
      }
    })
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: res => {
        this.products = res.data;
        this.totalCount = res.count;
      }
    });
  }

  onPageChanged(event: any) {
    const params = this.productService.getParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.productService.setParams(params);
      this.params = params;
      this.loadProducts();
    }
  }

  onSortSelected(event: any) {
    const params = this.productService.getParams();
    params.sort = event.target.value;
    this.productService.setParams(params);
    this.params = params;
    this.loadProducts();
  }

  onTypeSelected(id: number) {
    const params = this.productService.getParams();
    params.itemClassId = id;
    params.pageNumber = 1;
    this.productService.setParams(params);
    this.params = params;
    this.loadProducts();
  }

  onSearch() {
    const params = this.productService.getParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.productService.setParams(params);
    this.params = params;
    this.loadProducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.params = new ProductsParams();
    this.productService.setParams(this.params);
    this.loadProducts();
  }
}
