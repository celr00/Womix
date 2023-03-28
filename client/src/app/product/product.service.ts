import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/models/product';
import { Observable, map, of } from 'rxjs';
import { Pagination } from '../shared/models/pagination';
import { ProductsParams } from '../shared/models/productsParams';
import { Type } from '../shared/models/type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  params = new ProductsParams();
  types: Type[] = [];

  constructor(private http: HttpClient) { }

  add(product: any) {
    return this.http.post(this.baseUrl + 'products', product);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  edit(product: any) {
    return this.http.put(this.baseUrl + 'products', product);
  }

  getAll(): Observable<Pagination<Product[]>> {

    let params = new HttpParams();

    if (this.params.itemClassId > 0) params = params.append('itemClassId', this.params.itemClassId);
    if (this.params.userId > 0) params = params.append('userId', this.params.userId);
    params = params.append('sort', this.params.sort);
    params = params.append('pageIndex', this.params.pageNumber);
    params = params.append('pageSize', this.params.pageSize);
    if (this.params.search) params = params.append('search', this.params.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params});
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getTypes(): Observable<Type[]> {
    if (this.types.length > 0) return of(this.types);

    return this.http.get<Type[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    );
  }

  setParams(params: ProductsParams) {
    this.params = params;
  }

  getParams() {
    return this.params;
  }

  resetParams() {
    this.params = new ProductsParams();
  }

  deletePhoto(photoId: number, productId: number): Observable<Product> {
    let params = new HttpParams();

    params = params.append('photoId', photoId);
    params = params.append('productId', productId);

    return this.http.delete<Product>(this.baseUrl + 'products/photo/delete', {params});
  }

}
