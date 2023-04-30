import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../shared/models/product';
import { Observable, map, of, tap } from 'rxjs';
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
  products: Product[] = [];
  pagination?: Pagination<Product[]>;
  productCache = new Map<string, Pagination<Product[]>>();

  constructor(private http: HttpClient) { }

  getAll(useCache = true): Observable<Pagination<Product[]>> {
    if (!useCache) this.productCache = new Map();

    if(this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.params).join('-'))) {
        this.pagination = this.productCache.get(Object.values(this.params).join('-'));
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.params.itemClassId > 0) params = params.append('itemClassId', this.params.itemClassId);
    if (this.params.userId > 0) params = params.append('userId', this.params.userId);
    params = params.append('sort', this.params.sort);
    params = params.append('pageIndex', this.params.pageNumber);
    params = params.append('pageSize', this.params.pageSize);
    if (this.params.search) params = params.append('search', this.params.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params}).pipe(
      map(response => {
        this.productCache.set(Object.values(this.params).join('-'), response);
        this.pagination = response;
        return response;
      })
    )
  }

  getProduct(id: number): Observable<Product> {
    const product = [...this.productCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Product)

    if (Object.keys(product).length !== 0) return of(product);

    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  setParams(params: ProductsParams) {
    this.params = params;
  }

  getParams() {
    return this.params;
  }

  getTypes(): Observable<Type[]> {
    if (this.types.length > 0) return of(this.types);

    return this.http.get<Type[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    );
  }

  add(req: any): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products', req).pipe(
      tap((newProduct: Product) => {
        // add the new product to the cache
        if (this.productCache.size > 0) {
          const cacheKeys = Array.from(this.productCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.productCache.get(key)!;
            // check if the new product matches the current filter criteria
            if (cacheValue.data.length < cacheValue.pageSize && this.paramsMatchFilterCriteria(newProduct)) {
              cacheValue.data.push(newProduct);
              cacheValue.count += 1;
              this.productCache.set(key, cacheValue);
            }
          }
        }
      })
    );
  }

  private paramsMatchFilterCriteria(product: Product): boolean {
    // check if the product matches the current filter criteria
    const params = this.getParams();
    return (params.itemClassId === 0 || product.productItemClass.itemClass.id === params.itemClassId)
      && (params.search === '' || product.name.toLowerCase().includes(params.search.toLowerCase()))
      && (params.userId === 0 || product.userProduct.userId === params.userId);
  }

  delete(id: number): Observable<any> {
    const url = `${this.baseUrl}products/${id}`;

    return this.http.delete(url).pipe(
      tap(() => {
        // remove the deleted product from the cache
        if (this.productCache.size > 0) {
          const cacheKeys = Array.from(this.productCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.productCache.get(key)!;
            cacheValue.data = cacheValue.data.filter(s => s.id !== id);
            cacheValue.count = cacheValue.count - 1;
            this.productCache.set(key, cacheValue);
          }
        }
      }),
      map((res: any) => {
        return res;
      })
    );
  }

  edit(req: any): Observable<any> {
    return this.http.put(this.baseUrl + 'products', req).pipe(
      tap((res: any) => {
        const updatedProduct = res as Product;
        // update the product in the cache if it exists
        if (this.productCache.size > 0) {
          const cacheKeys = Array.from(this.productCache.keys());
          for (const key of cacheKeys) {
            const cacheValue = this.productCache.get(key)!;
            const index = cacheValue.data.findIndex(s => s.id === updatedProduct.id);
            if (index !== -1) {
              // update the product in the cache
              cacheValue.data[index] = updatedProduct;
              this.productCache.set(key, cacheValue);
            }
          }
        }
      }),
      map((res: any) => {
        return res;
      })
    );
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
