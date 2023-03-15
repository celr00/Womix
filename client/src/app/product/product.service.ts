import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/models/product';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] | undefined;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    if (this.products === undefined) {
      return this.http.get<Product[]>(this.baseUrl + 'products')
        .pipe(
          map((response: any) => {
            this.products = response.data;
            const products = response.data;

            return products;
          })
        )
    }
    return of(this.products);
  }

  getById(id: number): Product {
    const index = this.products!.findIndex(x => x.id === id);
    return this.products![index];
  }

}
